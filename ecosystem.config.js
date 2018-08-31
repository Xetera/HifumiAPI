module.exports = {
	apps: [{
		name: 'HifumiAPI',
		script: 'dist/index.js',
		max_restarts: 3,
		env: {
			NODE_ENV: 'DEVELOPMENT',
		},
		env_production: {
			NODE_ENV: 'PRODUCTION',
		},
	}],
};
