// electron/main.js
import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1080,
    height: 720,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  console.log(
    "Cargando:",
    `file://${path.join(__dirname, "../dist/index.html")}`
  );
  win.loadURL(`file://${path.join(__dirname, "../dist/index.html")}`);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
