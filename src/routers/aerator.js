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
const Timer = require( '../utils/set-timer' );

let aeratorStream;
let aeratorTimer = new Timer( 'aerator' );

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

router.route( '/set' )

	.post( ( req, res ) => {
		let msg = {
			message: ''
		};

		if ( req.body.on && req.body.off ) {
			aeratorTimer.setTimes(
				new Date(req.body.on),
				new Date(req.body.off)
			);

			msg.message = 'call set aerator times ' + req.body.on;
		} else {
			msg.message = 'did not set aerator times';
		}

		res.status( 200 ).json( msg ).send();
	});

router.route( '/status' )

	.get( ( req, res ) => {
		aeratorStream.on( events.AERATOR_POST_STATUS, ( data ) => {
			// get the status from the aerator hardware (particle event)
		});
		device.publishEvent( events.AERATOR_GET_STATUS );
	});

module.exports = router;
