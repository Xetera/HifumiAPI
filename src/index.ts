import * as express from 'express'
import * as path from 'path'
import * as http from 'http'
import * as bodyParser from 'body-parser'
import * as subdomain from 'express-subdomain'
import * as morgan from 'morgan'

// Get our API routes
import {router} from './routes/router'
import {logger} from "./logger/winston";

const app = express();

// Parsers for POST data
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));
app.use(morgan('combined'));

app.use(subdomain('api', router));


// Catch all other routes and return the index file

/**
 * Get port from environment and store in Express.
 */


const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Setting the subdomain
 */
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => logger.info(`API running on localhost:${port}`));
