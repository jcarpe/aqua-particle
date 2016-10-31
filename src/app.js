/**
 * Package Imports
 */
const debug = require( 'debug' )( 'main' );
const express = require( 'express' );
const helmet = require( 'helmet' );
const compression = require( 'compression' );
const bodyParser = require( 'body-parser' );

/**
 * SRC Imports
 */
const config = require( './config/dev.config' );
const device = require( './particle/particle' );
const apiRouter = require( './routers/aqua-api' );
const errorHandlers = require( './middleware/error-handlers' );

/**
 * Definitions
 */
const port = config.EXPRESS_PORT;
const app = express();

/**
 * Apply middlewares to our express application, including our router(s)
 *
 * helmet 		:: this is a collection of middlewares focused on modifying
 * 				   the response headers for the purpose of security
 *
 * compression 	:: gzip responses from the express app, in this example we've
 * 				   modified the setting to compress everything at the maximum level
 *
 * errorHandlers:: these are the error handeling functions we've defined and
 * 				   can be included on an ass-needed basis
 */
app.use( helmet() );
app.use( compression({
	level: config.Compression.LEVEL,
	threshold: config.Compression.THRESHOLD
}));
app.use( bodyParser.urlencoded({
	extended: true
}));
app.use( bodyParser.json() );

app.use( '/aqua-api', apiRouter );

app.use( errorHandlers.logErrors );
app.use( errorHandlers.clientSideErrors );

/**
 * Start the express application
 */
app.listen( port );

debug( 'end points available on port:', port );

module.exports = app;