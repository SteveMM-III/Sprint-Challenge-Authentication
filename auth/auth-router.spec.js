const request = require( 'supertest'            );
const db      = require( '../database/dbConfig' );
const server  = require( '../api/server'        );

describe( 'auth-router.js', () => {
  describe( 'environment', () => {
    it( 'should set environment to testing', () => {
      expect( process.env.DB_ENV ).toBe( 'testing' );
    } );
  } );
  describe( 'POST /register', () => {
    beforeEach( async() => {
      await db( 'users' ).truncate();
    } );
    it( 'should return a status 201 created', async() => {
      await request( server )
        .post( '/api/auth/register' )
        .send( { username: 'test', password: 'pass' } )
        .then( res => {
          console.log( res.status );
          expect( res.status ).toBe( 201 );
        } );
    } );
    it( 'should return a JSON object', async() => {
      await request( server )
        .post( '/api/auth/register' )
        .send( { username: 'test2', password: 'pass' } )
        .then( res => {
          expect( res.type ).toMatch( /json/i );
        } );
    } );
  } );
  describe( 'POST /login', () => {
    it( 'should return a status 200 OK', async() => {
      await request( server )
        .post( '/api/auth/login' )
        .send( { username: 'test2', password: 'pass' } )
        .then( res => {
          expect( res.status ).toBe( 200 );
        } );
    } );
    it( 'should return a JSON object', async() => {
      await request( server )
        .post( '/api/auth/login' )
        .send( { username: 'test2', password: 'pass' } )
        .then( res => {
          expect( res.type ).toMatch( /json/i );
        } );
    } );
  } );
  describe( 'GET /logout', () => {
    it( 'should return a status 200 OK', async() => {
      await request( server )
        .get( '/api/auth/logout' )
        .then( res => {
          expect( res.status ).toBe( 200 );
        } );
    } );
    it( 'should return a JSON object', async() => {
      await request( server )
        .get( '/api/auth/logout' )
        .then( res => {
          expect( res.type ).toMatch( /json/i );
        } );
    } );
  } );
} );
