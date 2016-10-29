/**
 * Package Imports
 */
const debug = require( 'debug' )( 'lights-route' );
const express = require( 'express' );

/**
 * SRC Imports
 */
const events = require( '../constants/particle-events' );
const device = require( '../particle/particle' );

let lightStream;

// get event stream for 
device.getEventStream()
.then( ( stream ) => {
	lightStream = stream;
});

/**
 * Definitions
 */
const router = express.Router();

router.route( '/toggle' )

	.post( ( req, res ) => {
		let msg = {
			message: 'Lights status was not successfully changed'
		};

		if ( req.body.on ) {
			device.publishEvent( events.LIGHTS_ON );
			msg.message = `${events.LIGHTS_ON} particle event published`;
		} else {
			device.publishEvent( events.LIGHTS_OFF );
			msg.message = `${events.LIGHTS_OFF} particle event published`;
		}

		res.status( 200 ).json( msg ).send();
	});

router.route( '/status' )

	.get( ( req, res ) => {
		lightStream.on( events.AERATOR_POST_STATUS, ( data ) => {

		});
		device.publishEvent( events.AERATOR_GET_STATUS );
	});

module.exports = router;