const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');

const WINDOW_WIDTH = 480;
const MIN_WINDOW_WIDTH = 360;
const MIN_HEIGHT = 640;
const MAX_HEIGHT = 1400;
let mainWindow;
let petWindow;
let desiredHeight = 780;
let autoResizing = false;

function showMainWindow() {
  if (!mainWindow || mainWindow.isDestroyed()) {
    mainWindow = null;
    createWindow();
    return;
  }
  if (mainWindow.isMinimized()) mainWindow.restore();
  mainWindow.show();
  mainWindow.focus();
}

function sendPetState(visible) {
  if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('pet-state', visible);
}

function hidePet() {
  if (petWindow && !petWindow.isDestroyed()) petWindow.hide();
  sendPetState(false);
}

function createPetWindow() {
  petWindow = new BrowserWindow({
    width: 290,
    height: 175,
    frame: false,
    transparent: true,
    resizable: false,
    movable: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    hasShadow: false,
    show: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      // The app is a local file:// shell; user-configured API endpoints need the same cross-origin access as the hot-reload page.
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  const workArea = screen.getPrimaryDisplay().workArea;
  petWindow.setPosition(workArea.x + workArea.width - 310, workArea.y + workArea.height - 205);
  petWindow.loadFile(path.join(__dirname, 'pet.html'));
  petWindow.on('closed', () => { petWindow = null; });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: 780,
    minWidth: MIN_WINDOW_WIDTH,
    minHeight: MIN_HEIGHT,
    maxHeight: MAX_HEIGHT,
    resizable: true,
    title: 'COLOLO',
    backgroundColor: '#edf3f6',
    titleBarStyle: 'default',
    icon: process.platform === 'win32'
      ? path.join(__dirname, 'assets/cololo-logo.png')
      : app.isPackaged ? path.join(process.resourcesPath, 'icon.icns') : path.join(__dirname, 'build/icon.icns'),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      // The app is a local file:// shell; user-configured API endpoints need the same cross-origin access as the hot-reload page.
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.once('ready-to-show', () => mainWindow.show());
  mainWindow.on('closed', () => { mainWindow = null; });
  mainWindow.on('will-resize', (event, newBounds) => {
    if (autoResizing || newBounds.height === desiredHeight) return;
    event.preventDefault();
    mainWindow.setBounds({ x: newBounds.x, y: newBounds.y, width: newBounds.width, height: desiredHeight });
  });
}

ipcMain.on('resize-window', (event, contentHeight) => {
  if (!mainWindow || mainWindow.isDestroyed() || event.sender !== mainWindow.webContents) return;
  const height = Math.max(MIN_HEIGHT, Math.min(MAX_HEIGHT, Math.ceil(Number(contentHeight) || MIN_HEIGHT)));
  const bounds = mainWindow.getBounds();
  desiredHeight = height;
  if (bounds.height !== height) {
    autoResizing = true;
    mainWindow.setSize(bounds.width, height);
    autoResizing = false;
  }
});

ipcMain.on('set-pet-visible', (event, visible) => {
  if (!mainWindow || mainWindow.isDestroyed() || event.sender !== mainWindow.webContents || !petWindow || petWindow.isDestroyed()) return;
  if (visible) petWindow.show();
  else petWindow.hide();
});

ipcMain.on('open-main-window', (event) => {
  if (!petWindow || petWindow.isDestroyed() || event.sender !== petWindow.webContents) return;
  showMainWindow();
});

ipcMain.on('exit-pet', (event) => {
  if (event.sender !== petWindow?.webContents) return;
  hidePet();
});

ipcMain.on('move-pet', (event, delta) => {
  if (!petWindow || petWindow.isDestroyed() || event.sender !== petWindow.webContents || !delta) return;
  const [x, y] = petWindow.getPosition();
  petWindow.setPosition(Math.round(x + Number(delta.deltaX || 0)), Math.round(y + Number(delta.deltaY || 0)));
});

ipcMain.on('pet-image', (event, payload) => {
  if (!petWindow || petWindow.isDestroyed() || event.sender !== petWindow.webContents || !payload?.dataUrl) return;
  if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send('pet-image', payload);
});

ipcMain.on('pet-bubble', (event, message) => {
  if (!mainWindow || mainWindow.isDestroyed() || event.sender !== mainWindow.webContents || !petWindow || petWindow.isDestroyed()) return;
  petWindow.webContents.send('pet-bubble', message);
});

app.whenReady().then(() => {
  createWindow();
  createPetWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
