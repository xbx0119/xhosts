const electron = require('electron');
const { app, BrowserWindow, nativeImage } = require('electron');
const path = require('path');

let win;
const iconPath = path.join(__dirname, './icons/64x64.png');
global.icon = nativeImage.createFromPath(iconPath);


function createWindow() {
	const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;

	win = new BrowserWindow({
		title: 'xhosts',
		icon: icon,
		width: 0, // 300,
		height: 0, // 100,
		frame: false,
		x: width - 320,
		y: 180,
		fullscreenable: false,
		skipTaskbar: true,
		// type: '',
		// titleBarStyle: 'hidden' // macos
		// resizable: false,
	});
	win.loadFile('index.html');
	// win.webContents.openDevTools();
}


const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
 	app.quit()
} else {
  	app.on('second-instance', (event, commandLine, workingDirectory) => {
	    if (win) {
	    	if (win.isMinimized()) {
	    		win.restore()
	    	}
	      	win.focus();
	    }
  	})

  	app.on('ready', () => {
		createWindow();

		const setMenu = require('./utils/setMenu');
		setMenu();
	});
}



app.on('window-all-closed', () => {
	app.quit();
});
