import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { isDev } from "./utils.js";
import db from "../database/db.js";
function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.ts"),
    },
  });

  if (isDev()) {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(app.getAppPath(), "/dist/app/index.html"));
  }
}

app.whenReady().then(() => {
  ipcMain.handle("ping", () => "pong");
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });
});

function handleIpc(
  channel: string,
  handler: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any
) {
  ipcMain.handle(channel, async (event, ...args) => {
    try {
      const result = await handler(event, ...args);
      return result;
    } catch (error) {
      console.error(
        `❌ IPC Error on "${channel}":`,
        error instanceof Error ? error.message : String(error)
      );
      return {
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  });
}

handleIpc("get-bills", () => {
  try {
    const rows = db.prepare("SELECT * FROM bills").all();
    return rows;
  } catch (err) {
    throw err;
  }
});

handleIpc("create-bill", (event, bill) => {
  try {
    const { customer_name, total_amount } = bill;
    const stmt = db.prepare(
      "INSERT INTO bills (customer_name, total_amount) VALUES (?, ?)"
    );
    const info = stmt.run(customer_name, total_amount);
    return info;
  } catch (err) {
    throw err;
  }
});

handleIpc("delete-bill", (event, id) => {
  db.prepare("DELETE FROM bills WHERE id = ?").run(id);
});

handleIpc("get-products", () => {
  try {
    const rows = db.prepare("SELECT * FROM products").all();
    return rows;
  } catch (err) {
    throw err;
  }
});
