/**
 * Package Imports
 */
const debug = require( 'debug' )( 'login-route' );
const express = require( 'express' );

/**
 * SRC Imports
 */
const events = require( '../constants/particle-events' );
const device = require( '../particle/particle' );

/**
 * Definitions
 */
const router = express.Router();

router.route( '/' )

	.post( ( req, res ) => {
		let msg = {
			message: 'Aqua API Login Success'
		};

		if ( req.body.username && req.body.password ) {
			device.login( req.body.username , req.body.password )
				.then( ( data ) => {
					// debug( data );
				})
				.catch( ( err ) => {
					debug( 'login failed' );
				});
		} else {
			msg.message = `Please ensure both username and password`;
		}

		res.status( 200 ).json( msg ).send();
	});

module.exports = router;