/**
 * Package Imports
 */
const debug = require( 'debug' )( 'test-route' );
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

router.route( '/toggle' )

	.post( ( req, res ) => {
		let msg = {
			message: 'Test lamp status was not successfully changed'
		};

		if ( req.body.on ) {
			device.publishEvent( events.TEST_LAMP_ON );
			msg.message = `${events.TEST_LAMP_ON} particle event published`;
		} else {
			device.publishEvent( events.TEST_LAMP_OFF );
			msg.message = `${events.TEST_LAMP_OFF} particle event published`;
		}

		res.status( 200 ).json( msg ).send();
	});

module.exports = router;