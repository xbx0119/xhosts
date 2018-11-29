/**
 *
 */

const electron = require('electron');

module.exports = function notice(msg) {

	let notice = new electron.Notification({
		title: 'xhosts',
		body: msg,
		silent: false
	});	

	notice.show();
}