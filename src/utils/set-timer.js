/**
 * Package Imports
 */
const debug = require( 'debug' )( 'set-timer' );

/**
 * Definitions
 */
let timeSettings = {
	aerator: {
		enabled: false,
		on: new Date(),
		off: new Date()
	},
	lights: {
		enabled: false,
		on: new Date(),
		off: new Date()
	}
};

/**
 * Apply aerator on and off times
 * @param  {Date} onTimeDt
 * @param  {Date} offTimeDt
 */
const setAeratorTimes = ( onTimeDt, offTimeDt ) => {
	timeSettings.aerator.on = onTimeDt;
	timeSettings.aerator.off = offTimeDt;

	debug( 'set aerator times in set timer' );
};

const enableAerator = ( enabled ) => {
	timeSettings.aerator.enabled = enabled;

	debug( 'enable aerator' );
};

/**
 * Apply lights on and off times
 * @param  {Date} onTimeDt
 * @param  {Date} offTimeDt
 */
const setLightTimes = ( onTimeDt, offTimeDt ) => {
	timeSettings.lights.on = onTimeDt;
	timeSettings.lights.off = offTimeDt;
};

const enableLights = ( enabled ) => {
	timeSettings.lights.enabled = enabled;
};

/**
 * Check once per minute against the timer settings
 */
let checkInterval = setInterval( () => {
	let currentTime = new Date();

	debug( currentTime );
	debug( timeSettings.aerator.on );

	if (
		currentTime.getHours() >= timeSettings.aerator.on.getHours() &&
		currentTime.getMinutes() >= timeSettings.aerator.on.getMinutes() &&
		timeSettings.aerator.enabled
	) {
		// turn aerator on
		debug( 'turn on the aerator' );
	} else if (
		currentTime.getHours() >= timeSettings.aerator.off.getHours() &&
		currentTime.getMinutes() >= timeSettings.aerator.off.getMinutes() &&
		timeSettings.aerator.enabled
	) {
		// turn aerator off
		debug( 'turn off the aerator' );
	}
}, 1000 );

module.exports = {
	setAeratorTimes: setAeratorTimes,
	enableAerator: enableAerator,
	setLightTimes: setLightTimes
};