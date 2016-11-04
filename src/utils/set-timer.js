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
		on: null,
		off: null
	},
	lights: {
		enabled: false,
		on: null,
		off: null
	}
};

const setAeratorTimes = ( onTimeDt, offTimeDt ) => {
	timeSettings.aerator.on = onTimeDt;
	timeSettings.aerator.off = offTimeDt;
};

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