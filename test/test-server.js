var chai = require( 'chai' );
var chaiHttp = require( 'chai-http' );
var server = require( '../src/app' );
var should = chai.should();

chai.use( chaiHttp );

describe( 'Aqua API', () => {

	it( 'should log user in to Particle on /aqua-api/login POST', ( done ) => {
		chai.request(server)
			.post( '/aqua-api/login' )
			.field( '_method', 'post' )
			.field( 'username', 'joe_carpenito@yahoo.com')
			.field( 'password', 'kfH9Xbf7z9xVAc9WAJTt' )
			.end( ( err, res ) => {
				res.should.have.status( 200 );
				done();
			});
	});

});