module.exports = function sudoEdit(path, data, resolve, reject) {
	const sudo = require('sudo-prompt');
	const options = {
		name: 'xhosts',
	};
	let command = `sh -c "echo '${data}' > ${path}"`;

	sudo.exec(command, options,
		function(error, stdout, stderr) {
			if (error) {
				reject(error)
				throw error;
			};
			resolve();
		}
	);
}
