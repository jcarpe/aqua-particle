/**
 * Package Imports
 */
const debug = require( 'debug' )( 'error-handlers' );

module.exports = {

	/**
	 * Log errors to the nodeJS console (running on the server)
	 */
	logErrors: ( err, req, res, next ) => {
		console.error( err );
		next( err );
	},

	/**
	 * Return an error client-side as a response
	 */
	clientSideErrors: ( err, req, res, next ) => {

		let errCode = req.returnServerStatusCode ? req.returnServerStatusCode : 500;

		res.status( errCode ).send({
			error: err.message
		});
	}

};