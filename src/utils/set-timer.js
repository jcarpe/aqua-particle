/**
 * Package Imports
 */
const debug = require( 'debug' )( 'set-timer' );

class Timer {

	constructor () {
		this.config = {
			onTime: null,
			offTime: null,
			isOn: false,
			intervalTime: 1000
		};

		this.checkInterval = setInterval( () => {
			let currentTime = new Date();

			if ( this.config.onTime && this.config.offTime ) {

				if (
					currentTime.getTime() > this.config.onTime.getTime() &&
					!this.config.isOn
				) {

					this.config.isOn = true;
				}
				else if (
					currentTime.getTime() > this.config.offTime.getTime() &&
					this.config.isOn
				) {
					this.config.isOn = false;
				}
			}
		}, this.config.intervalTime);
	}

	setTimes ( onTimeDt, offTimeDt ) {
		this.config.onTime = onTimeDt;
		this.config.offTime = offTimeDt;
	}

	checkIsOn () {
		return this.config.isOn;
	}

}

module.exports = Timer;
