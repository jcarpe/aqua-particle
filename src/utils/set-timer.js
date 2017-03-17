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


			let currentTime = new Date(),
					currentHours = currentTime.getHours(),
					currentMins = currentTime.getMinutes(),
					currentSeconds = currentTime.getSeconds();

			// begin check only if there are valid on/off times
			if ( this.config.onTime && this.config.offTime ) {

				// check if the current hours and minutes are the same as the hours and
				// minutes of the set on time and check if the current config is off
				if (
					currentHours === this.config.onTime.getHours() &&
					currentMins === this.config.onTime.getMinutes() &&
					currentSeconds === this.config.onTime.getSeconds() &&
					!this.config.isOn
				) {
					debug( this.config.equipment, 'is on' );
					this.config.isOn = true;
				}

				// check if the current hours and minutes are the same as the hours and
				// minutes of the set off time and check if the current config is on
				if (
					currentHours === this.config.offTime.getHours() &&
					currentMins === this.config.offTime.getMinutes() &&
					currentSeconds === this.config.offTime.getSeconds() &&
					this.config.isOn
				) {
					debug( this.config.equipment, 'is off' );
					// this.config.onTime = this.config.offTime = null;
					this.config.isOn = false;
				}
			}
		}, this.config.intervalTime);
	}

	setTimes ( onTimeDt, offTimeDt ) {
		debug( this.config.equipment, 'on/off times set' );
		this.config.onTime = onTimeDt;
		this.config.offTime = offTimeDt;
	}

	checkIsOn () {
		return this.config.isOn;
	}

}

module.exports = Timer;
