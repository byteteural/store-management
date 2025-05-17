import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./utils.js";

function createWindow() {
  const win = new BrowserWindow({
    width: 1600,
    height: 900,
    resizable: false,
  });

  if (isDev()) {
    win.loadURL("http://localhost:5173");
  } else {
    win.loadFile(path.join(app.getAppPath(), "/dist/app/index.html"));
  }
}

app.whenReady().then(() => {
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
