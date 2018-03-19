
module.exports = (args) => {
	let config;

	let configDir = process.env.MAILIT_CONFIG || args.options.config || '../config.json';

	try {
		config = require(configDir);
	} catch(e) {
		config = {};
	}

	const vendor = 'MAILIT';
	const fields = ['webPort', 'host', 'port', 'secure', 'user', 'pass', 'rejectUnauthorized'];
	const required = ['host', 'port'];

	fields.forEach(field => {
		const env = `${vendor}_${field}`.toUpperCase();
		if (process.env[env] !== undefined) {
			config[field] = process.env[env];
		}
		if (args.options[field] !== undefined) {
			config[field] = args.options[field];
		}
	});

	const missing = required.filter(field => {
		return !config[field];
	});

	if (missing.length > 0) {
		throw new Error(`No ${missing.join(', ')} specified in config.`);
	}

	Object.keys(config)
		.filter(item => {
			return item !== 'pass'
		}).forEach(item => {
			console.log(`  ${item}: ${config[item]}`);
		});

	return config;
}
