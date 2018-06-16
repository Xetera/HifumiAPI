import * as express from 'express'
import * as cors from 'cors'
import * as glob from 'glob'
import * as path from "path";

export const router = express.Router();

const corsOptions = {
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

router.use(cors(corsOptions));

glob('dist/routes/**/*.js', (er, files) => {
	if (er){
		// This is a fatal error;
		throw er;
	}
	for (const file of files){
		// we have to walk back on the path for some reason but it works
		const route = require(path.join(__dirname, '..', '..', file));
		if (route.endpoints){
			route.endpoints(router);
		}
	}
});

