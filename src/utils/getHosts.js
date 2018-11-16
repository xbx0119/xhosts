/**
 * @returns { Array[{ domain: string, ips: [string], valid: boolean, raw: string }] }
 *
 */

const fs = require('fs');
const getHostsPath = require('./getHostsPath');


function readHosts() {
	let hostsPath = getHostsPath();
	if (hostsPath) {
		let data = fs.readFileSync(hostsPath, {
			encoding: 'utf8'
		});
		data = data.split('\n');
		data = data.map(line => {
			line = line.replace(/\s+/g, ' '); // 
			line = line.replace(/#+/g, '#'); // 
			line = line.trim();
			return line;
		});
		
		return data;
	}
	return '';
}

function computeRule(str) {
	let rule = {
		valid: false,
		isComment: false,
		raw: '',
		ip: '',
		domain: '',
	};
	if (str !== '') {
		let ip = getIp(str),
			domain = getDomain(str);
		if (ip && domain) {
			rule.valid = true;
			rule.ip = ip;
			rule.domain = domain;
		}
	}
	rule.isComment = isComment(str);
	rule.raw = str;

	return rule;
}

function getIp(str) {
	let ip = str.match(/(\d+\.){3}\d+/g);
	if (ip) {
		return ip[0].trim();
	}
	return false;
}

function getDomain(str) {
	let domain = str.match(/(\D+\.)+\D+/g);
	if (domain) {
		return domain[0].trim();
	}
	return false;
}

function isComment(str) {
	return str[0] === '#';
}


module.exports = function getHosts() {
	let hosts = readHosts();

	hosts = hosts.map(line => {
		return computeRule(line);
	});

	return hosts;
};