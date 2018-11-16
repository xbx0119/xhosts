/**
 * 
 */

const { Tray, Menu } = require('electron');
const getHosts = require('./getHosts');
const setHosts = require('./setHosts');

function getMenu() {
	let hosts = getHosts();
	let groupDomain = {};

	hosts.forEach((host, index) => {
		if (host.valid) {
			if (groupDomain[host.domain]) {
				groupDomain[host.domain].push({
					ip: host.ip,
					checked: !host.isComment,
					line: index
				});
			} else {
				groupDomain[host.domain] = [{ ip: host.ip, checked: !host.isComment, line: index }];
			}
		}
	})
	let menu = [];
	for (let domain in groupDomain) {
		if (groupDomain[domain].length > 1) {
			menu.push({
				label: domain,
				submenu: groupDomain[domain].map(sub => {
					return {
						label: sub.ip,
						type: 'radio',
						checked: sub.checked,
						line: sub.line
					}	
				})
			})
		}
	}
	menu = menu.concat([
		{
	    	label: 'exit',
	    	role: 'quit'
	    }
	]);
	console.dir(menu, {
		depth: null
	});
	return menu;
};

function chooseHost(domain, menuItem) {
	setHosts(domain, menuItem.label);
}


module.exports = function setMenu() {
	let tray = new Tray(global.icon);
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

