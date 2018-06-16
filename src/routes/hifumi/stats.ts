import {logger} from "../../logger/winston";

// not really a good way to do this but it works for now
// later on we're gonna need to change this into a postgres
// or redis entry
interface IBotStats {
	users: number;
	guilds: number;
}

const botStats: IBotStats = {
	users: null,
	guilds: null
};

export const endpoints = (router) => {
	logger.silly('Initializing /stats endpoint');
	router.post('/stats', (req, res, next) => {
		console.log(res.headersSent);
		const apiKey = process.env['API_KEY'];
		if (!apiKey) {
			logger.warn(
				'A /stats router was posted to but the bot api key ' +
				'env variable was not set, dropping request.'
			);
			return next({message: 'Stats service is unavailable.', code: 503});
		}

		if (req.header('API_KEY') !== apiKey) {
			logger.warn('An unauthorized request was made');
			logger.warn(apiKey)
			logger.warn(req.header('API_KEY'));
			return next({message: 'Incorrect API key', code: 401});
		}

		const users = req.query.users;
		if (!users) {
			logger.warn("A /stats update was made without the 'users' parameter");
			return next({message: "'users' parameter missing", code: 400});
		}

		const guilds = req.query.guilds;

		if (!guilds) {
			logger.warn("A /stats update was made without the 'guilds' parameter");
			return next({message: "'guilds' parameter missing", code: 400});
		}

		// Dangerous, change before prod
		botStats.users = Number(users);
		botStats.guilds = Number(guilds);
		console.log(botStats);
		logger.info('A consumer has fetched stat information');
		res.send({message: 'Data updated successfully', code: 200});
	});

	router.get('/stats', (req, res, next) => {
		res.send({stats: botStats, code: 200});
	});

}
