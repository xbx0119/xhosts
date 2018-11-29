/**
 *
 */

const fs = require('fs');
const getHosts = require('./getHosts');
const getHostsPath = require('./getHostsPath');
const notice = require('./notice');
const sudoEdit = require('./sudoEdit');


module.exports = function setHosts(domain, ip) {
	let hosts = getHosts();
	let hostsPath = getHostsPath();

	let list = hosts.map(item => {
		let raw = item.raw;
		if (item.valid && item.domain === domain) {
			if (item.ip === ip) {
				if (item.isComment) {
					raw = raw.substr(1);
					raw = raw.trim();
				}
			} else {
				if (!item.isComment) {
					raw = '# ' + raw;
				}
			}
		}
		return raw;
	});

	let data = list.join('\n');

	sudoEdit(hostsPath, data, () => {
		notice(ip + '   ' + domain);
	}, (err) => {
		console.log(err.toString());
		notice(err.toString());
	});
}