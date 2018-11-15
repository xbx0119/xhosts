const electron = require('electron');
const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');
const path = require('path');
const getMenu = require('./utils/getMenu');

let win;
const iconPath = path.join(__dirname, './icons/64x64.png');
const icon = nativeImage.createFromPath(iconPath);
console.log(icon);



 
function chooseHost(domain, menuItem) {
	console.log(menuItem.label);
	// code
	noticeChange(domain, menuItem.label)
}


function noticeChange(domain, ip) {
	let notice = new electron.Notification({
		title: 'xhosts',
		body: ip + '   ' + domain,
		silent: false
	});
	notice.show();
}

function setSysInfo() {
	let tray = new Tray(icon);
	let menus = getMenu();
	menus = menus.map(menu => {
		if (menu.submenu && menu.submenu.length > 0) {
			menu.submenu = menu.submenu.map(sub => {
				sub.click = (menuItem) => { chooseHost(menu.label, menuItem) }
				return sub;
			})
		}
		return menu;
	});
 	const contextMenu = Menu.buildFromTemplate(menus);
  	tray.setToolTip('change your hosts quickly');
  	tray.setContextMenu(contextMenu);
}

function createWindow() {
	const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;

	win = new BrowserWindow({
		// type: '',
		title: 'xhosts',
		icon: icon,
		width: 0, // 300,
		height: 0, // 100,
		frame: false,
		x: width - 320,
		y: 180,
		// titleBarStyle: 'hidden' // macos
		// resizable: false,
		fullscreenable: false,
		skipTaskbar: true,
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
	    	if (win.isMinimized()) win.restore()
	      	win.focus()
	    }
  	})

  	app.on('ready', () => {
		createWindow();
		setSysInfo();
	});
}



app.on('window-all-closed', () => {
	app.quit();
})
