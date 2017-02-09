var chai = require( 'chai' );
var chaiHttp = require( 'chai-http' );
var server = require( '../src/app' );
var should = chai.should();

chai.use( chaiHttp );

describe( 'Aqua API', () => {

	it( 'should log user in to Particle on /aqua-api/login POST', ( done ) => {
		chai.request( server )
			.post( '/aqua-api/login' )
			.send({
				username: 'joe_carpenito@yahoo.com',
				password: 'kfH9Xbf7z9xVAc9WAJTt'
			})
			.end( ( err, res ) => {
				res.should.have.status( 200 );
				res.body.message.should.equal( 'Aqua API Login Success' );
				done();
			});
	});

	it ( 'should turn test the API availability by hitting the root URL /aqua-api GET', ( done ) => {
		chai.request( server )
			.get( '/aqua-api' )
			.end( ( err, res ) => {
				res.should.have.status( 200 );
				res.body.message.should.equal( 'Aqua API' );
				done();
			});
	});

	it ( 'should turn the test lamp ON at /aqua-api/test/toggle POST -> on', ( done ) => {
		chai.request( server )
			.post( '/aqua-api/test/toggle' )
			.send({
				on: true
			})
			.end( ( err, res ) => {
				res.should.have.status( 200 );
				res.body.message.should.equal( 'aquarium_toggle_on_test_indicator particle event published' );
				done();
			});
	});

	it ( 'should turn the test lamp OFF at /aqua-api/test/toggle POST -> off', ( done ) => {
		chai.request( server )
			.post( '/aqua-api/test/toggle' )
			.send({
				on: false
			})
			.end( ( err, res ) => {
				res.should.have.status( 200 );
				res.body.message.should.equal( 'aquarium_toggle_off_test_indicator particle event published' );
				done();
			});
	});

});
