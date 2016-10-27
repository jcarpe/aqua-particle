/**
 * Photon Code for aqua-particle project. These are simple binary changes for
 * enabling/disabling pieces of equipment.
 *
 * TODO: ability to read current status (on/off) of a piece of equipment
 */

#define TEST_INDICATOR D7
#define LIGHTS D6
#define AERATOR D5

void setup ( void ) {
    /**
     * Define the appliance output pins in order
     * to control power to them
     */
    pinMode( TEST_INDICATOR, OUTPUT );
    pinMode( LIGHTS, OUTPUT );
    pinMode( AERATOR, OUTPUT );
    
    Particle.subscribe( "aquarium_toggle_on_test_indicator", testToggleOnHandler, MY_DEVICES );
    Particle.subscribe( "aquarium_toggle_off_test_indicator", testToggleOffHandler, MY_DEVICES );
    Particle.subscribe( "aquarium_on_aerator", aeratorOnHandler, MY_DEVICES );
    Particle.subscribe( "aquarium_off_aerator", aeratorOffHandler, MY_DEVICES );
    Particle.subscribe( "aquarium_on_aqua_lights", lightOnHandler, MY_DEVICES );
    Particle.subscribe( "aquarium_off_aqua_lights", lightOffHandler, MY_DEVICES );
}

void loop ( void ) {}

void testToggleOnHandler  ( const char *event, const char *data ) {
    digitalWrite( TEST_INDICATOR, HIGH );
}

void testToggleOffHandler  ( const char *event, const char *data ) {
    digitalWrite( TEST_INDICATOR, LOW );
}

void lightOnHandler ( const char *event, const char *data ) {
    digitalWrite( LIGHTS, HIGH );
}

void lightOffHandler ( const char *event, const char *data ) {
    digitalWrite( LIGHTS, LOW );
}

void aeratorOnHandler ( const char *event, const char *data ) {
    digitalWrite( AERATOR, HIGH );
}

void aeratorOffHandler ( const char *event, const char *data ) {
    digitalWrite( AERATOR, LOW );
}