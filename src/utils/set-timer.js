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

/**
 * Check once per minute against the timer settings
 */
let checkInterval = setInterval( () => {
	let currentTime = new Date();

	if (
		currentTime.getHours() >= timeSettings.aerator.on.getHours() &&
		currentTime.getMinutes() >= timeSettings.aerator.on.getMinutes() &&
		timeSettings.aerator.enabled
	) {
		// turn aerator on
	} else if (
		currentTime.getHours() >= timeSettings.aerator.off.getHours() &&
		currentTime.getMinutes() >= timeSettings.aerator.off.getMinutes() &&
		timeSettings.aerator.enabled
	) {
		// turn aerator off
	}
}, 60000 );

module.exports = {
	setAeratorTimes: setAeratorTimes,
	setLightTimes: setLightTimes
};