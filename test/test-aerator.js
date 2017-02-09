var chai = require( 'chai' );
var chaiHttp = require( 'chai-http' );
var server = require( '../src/app' );
var should = chai.should();

chai.use( chaiHttp );

describe( 'Aqua API -- aerator', () => {

  before( () => {
    chai.request( server )
     .post( '/aqua-api/login' )
     .send({
       username: 'joe_carpenito@yahoo.com',
       password: 'kfH9Xbf7z9xVAc9WAJTt'
     });
  });

	it( 'should turn on the lights on /aqua-api/aerator/toggle', ( done ) => {
    chai.request( server )
      .post( '/aqua-api/aerator/toggle' )
      .send({
        on: true
      })
      .end( ( err, res ) => {
        res.should.have.status( 200 );
				res.body.message.should.equal( 'aquarium_on_aerator particle event published' );
        done();
      });
  });

  it( 'should turn off the aerator on /aqua-api/aerator/toggle', ( done ) => {
    chai.request( server )
      .post( '/aqua-api/aerator/toggle' )
      .send({
        on: false
      })
      .end( ( err, res ) => {
        res.should.have.status( 200 );
				res.body.message.should.equal( 'aquarium_off_aerator particle event published' );
        done();
      });
  });

});
