/**
 * Package Imports
 */
const debug = require( 'debug' )( 'api-route' );
const express = require( 'express' );

const device = require( '../particle/particle' );
const testRouter = require( './test' );
const lightsRouter = require( './lights' );
const aeratorRouter = require( './aerator' );

const router = express.Router();

router.use( '/test', testRouter );
router.use( '/lights', lightsRouter );
router.use( '/aerator', aeratorRouter );

router.route( '/' )

	.get( ( req, res ) => {
		res.json({
			message: 'Aqua API'
		}).status( 200 ).send();
	});

module.exports = router;