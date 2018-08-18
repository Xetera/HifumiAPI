// @flow
const { exec } = require('child_process');


export const deployService = (app) => {
	app.post('/deploy', async (req, res) => {
		const key = req.get('Authorization');

		if (!key || key !== process.env.SUPER_SECRET) {
			return res.status(403).end('Unauthorized');
		}
		const pathToScript = process.env.DEPLOYMENT_PATH;
		console.log(pathToScript);
		if (!pathToScript) {
			return res.status(500).end();
		}
		const child = exec(`bash ${pathToScript}`, console.log);

		// child.stdout.on('data', out => console.error(out.toString()));
		// child.stderr.on('data', err => console.error(err.toString()));
		// child.on('close', () => console.log('connection closed'));
		// child.on('exit', () => console.log('connection closed'));
		return res.status(200).end();
	});
};
