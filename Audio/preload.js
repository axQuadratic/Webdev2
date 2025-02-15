const { contextBridge, ipcRenderer } = require("electron");

window.addEventListener('DOMContentLoaded', function() {});

contextBridge.exposeInMainWorld("electronAPI", {
    uploadTrackData: async (data) => await ipcRenderer.invoke("uploadTrackData", data),
    selectFile: async (fileType) => await ipcRenderer.invoke("openFileSelection", fileType),
    requestPageData: async (page) => await ipcRenderer.invoke("renderPage", page)
});