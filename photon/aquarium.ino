
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
    
    Particle.subscribe( "aquarium_toggle_on_test_indicator", testToggleOnHandler );
    Particle.subscribe( "aquarium_toggle_off_test_indicator", testToggleOffHandler );
    Particle.subscribe( "aquarium_on_aerator", aeratorOnHandler );
    Particle.subscribe( "aquarium_off_aerator", aeratorOffHandler );
    Particle.subscribe( "aquarium_on_aqua_lights", lightOnHandler );
    Particle.subscribe( "aquarium_off_aqua_lights", lightOffHandler );
}

void loop ( void ) {
    if ( Particle.connected() == false ) {
        Particle.connect();
    }
}

void testToggleOnHandler  ( const char *event, const char *data ) {
    Serial.println( "toggle on test lamp indicator" );
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