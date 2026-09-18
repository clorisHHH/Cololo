const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktopWindow', {
  resize: (height) => ipcRenderer.send('resize-window', height),
  setPetVisible: (visible) => ipcRenderer.send('set-pet-visible', visible),
  exitPet: () => ipcRenderer.send('exit-pet'),
  movePet: (deltaX, deltaY) => ipcRenderer.send('move-pet', { deltaX, deltaY }),
  openMain: () => ipcRenderer.send('open-main-window'),
  sendPetImage: (dataUrl, name, type) => ipcRenderer.send('pet-image', { dataUrl, name, type }),
  showPetBubble: (message) => ipcRenderer.send('pet-bubble', message),
  onPetImage: (callback) => ipcRenderer.on('pet-image', (_event, payload) => callback(payload)),
  onPetState: (callback) => ipcRenderer.on('pet-state', (_event, visible) => callback(visible)),
  onPetBubble: (callback) => ipcRenderer.on('pet-bubble', (_event, message) => callback(message))
});
