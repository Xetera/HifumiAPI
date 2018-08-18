// @flow
const { spawn } = require('child_process');


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
		const child = spawn('bash', [pathToScript]);
		child.stderr.on('data', (data) => {
			console.log(data.toString());
		});
		return res.status(200).end();
	});
};
