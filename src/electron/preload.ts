import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: {
    invoke: (channel: string, data: any) => ipcRenderer.invoke(channel, data),
  },
});
