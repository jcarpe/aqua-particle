/**
 * Package Imports
 */
const debug = require( 'debug' )( 'aerator-route' );
const express = require( 'express' );

/**
 * SRC Imports
 */
const events = require( '../constants/particle-events' );
const device = require( '../particle/particle' );

let aeratorStream;

// get event stream for 
device.getEventStream()
.then( ( stream ) => {
	aeratorStream = stream;
});

/**
 * Definitions
 */
const router = express.Router();

router.route( '/toggle' )

	.post( ( req, res ) => {
		let msg = {
			message: 'Aerator status was not successfully changed'
		};

		if ( req.body.on ) {
			device.publishEvent( events.AERATOR_ON );
			msg.message = `${events.AERATOR_ON} particle event published`;
		} else {
			device.publishEvent( events.AERATOR_OFF );
			msg.message = `${events.AERATOR_OFF} particle event published`;
		}

		res.status( 200 ).json( msg ).send();
	});

router.route( '/status' )

	.get( ( req, res ) => {
		aeratorStream.on( events.AERATOR_POST_STATUS, ( data ) => {

		});
		device.publishEvent( events.AERATOR_GET_STATUS );
	});

module.exports = router;