/**
 * Package Imports
 */
const debug = require( 'debug' )( 'particle' );
const Particle = require('particle-api-js');

/**
 * Definitions
 */
const particle = new Particle();

const config = require( '../config/dev.config' );

let token,
	deviceID;

const login = ( username, password ) => {
	return new Promise ( ( resolve, reject ) => {
		particle
			.login({
				username: username,
				password: password
			})
			.then( ( data ) => {
				debug( 'API call completed on promise resolve: ', data.body.access_token );
				token = data.body.access_token;
				resolve( data );
			})
			.catch( err => {
				debug( 'could not log in' );
			});
	});
};

/**
 * Publish an event to the Particle ecosystem
 * @param {String} eventName
 */
const publishEvent = ( eventName ) => {
	particle
		.publishEvent({
			name: eventName,
			data: {},
			auth: token })
		.then(
			function ( data ) {
				if ( data.body.ok ) {
					debug( 'Event ' + eventName + ' published succesfully' )
				}
			},
			function ( err ) {
				debug( 'Failed to publish event:', err );
			}
		);
};

const getEventStream = () => {
	return new Promise ( ( resolve, reject ) => {
		particle.getEventStream({
			deviceId: deviceID,
			auth: token
		}).then( ( stream ) => {
			resolve( stream );
		});
	});
};

const getDeviceID = () => {
	return deviceID;
};

const getAuthToken = () => {
	return token;
};

module.exports = {
	login: login,
	getDeviceID: getDeviceID,
	getAuthToken: getAuthToken,
	publishEvent: publishEvent,
	getEventStream: getEventStream
};
