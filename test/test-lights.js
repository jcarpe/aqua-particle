var chai = require( 'chai' );
var chaiHttp = require( 'chai-http' );
var server = require( '../src/app' );
var should = chai.should();

chai.use( chaiHttp );

describe( 'Aqua API -- lights', () => {

  before( () => {
    chai.request( server )
     .post( '/aqua-api/login' )
     .send({
       username: 'joe_carpenito@yahoo.com',
       password: 'kfH9Xbf7z9xVAc9WAJTt'
     });
  });

	it( 'should turn on the lights on /aqua-api/lights/toggle', ( done ) => {
    chai.request( server )
      .post( '/aqua-api/lights/toggle' )
      .send({
        on: true
      })
      .end( ( err, res ) => {
        res.should.have.status( 200 );
				res.body.message.should.equal( 'aquarium_on_aqua_lights particle event published' );
        done();
      });
  });

  it( 'should turn off the lights on /aqua-api/lights/toggle', ( done ) => {
    chai.request( server )
      .post( '/aqua-api/lights/toggle' )
      .send({
        on: false
      })
      .end( ( err, res ) => {
        res.should.have.status( 200 );
				res.body.message.should.equal( 'aquarium_off_aqua_lights particle event published' );
        done();
      });
  });

});
