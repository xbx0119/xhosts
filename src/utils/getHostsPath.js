

const os = require('os');
const notice = require('./notice');
const config = require('../config')

const plantform = os.platform(); // support win32 linux darwin
console.log(plantform);
let HostFilePath = '';

if (!config.host_file_path) {
	switch(plantform) {
		case 'linux':
			HostFilePath = '/etc/hosts';
			break;
		case 'win32':
			HostFilePath = 'C:/Windows/System32/drivers/etc/hosts';
			break;
		case 'darwin':
			HostFilePath = '/etc/hosts';
			break;
		default:
			notice('unsupport plantform');
			console.log('unsupport plantform');
	}
} else {
	HostFilePath = config.host_file_path;
}


module.exports = function getHostsPath() {
	return HostFilePath;
}