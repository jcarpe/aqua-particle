/**
 * Package Imports
 */
const debug = require( 'debug' )( 'set-timer' );

class Timer {

	constructor ( equipment ) {
		this.config = {
			onTime: null,
			offTime: null,
			isOn: false,
			intervalTime: 1000,
			equipment: equipment
		};

		this.checkInterval = setInterval( () => {
			let currentTime = new Date();

			if ( this.config.onTime && this.config.offTime ) {

				if (
					currentTime.getTime() > this.config.onTime.getTime() &&
					!this.config.isOn
				) {
					debug( this.config.equipment, 'is on' );
					this.config.isOn = true;
				}
				else if (
					currentTime.getTime() > this.config.offTime.getTime() &&
					this.config.isOn
				) {
					debug( this.config.equipment, 'is off' );
					this.config.onTime = this.config.offTime = null;
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
