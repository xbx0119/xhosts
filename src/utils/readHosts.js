/**
 *
 */


const fs = require('fs');
const getHostsPath = require('./getHostsPath');


module.exports = function readHosts() {
	let hostsPath = getHostsPath();
	if (hostsPath) {
		let data = fs.readFileSync(HostFilePath);
	}
}