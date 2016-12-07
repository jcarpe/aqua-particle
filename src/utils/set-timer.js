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
				debug( this.config.onTime, currentTime );

				if (
					currentTime.getHours() >= this.config.onTime.getHours() &&
					currentTime.getMinutes() >= this.config.onTime.getMinutes() &&
					currentTime.getHours() <= this.config.offTime.getHours() &&
					currentTime.getMinutes() < this.config.offTime.getMinutes() &&
					!this.config.isOn
				) {
					this.config.isOn = true;
					debug( 'turn on the aerator' );
				}
				else if (
					(
						(
							currentTime.getHours() >= this.config.offTime.getHours() &&
							currentTime.getMinutes() >= this.config.offTime.getMinutes()
						) || (
							currentTime.getHours() <= this.config.onTime.getHours() &&
							currentTime.getMinutes() < this.config.onTime.getMinutes()
						)
					) &&
					this.config.isOn
				) {
					this.config.isOn = false;
					debug( 'turn off the aerator' );
				}
			}
		}, this.config.intervalTime);
	}

	setTimes ( onTimeDt, offTimeDt ) {
		this.config.onTime = onTimeDt;
		this.config.offTime = offTimeDt;
	};

	checkIsOn () {
		// return this.config.isOn;
	};	

};

module.exports = Timer;