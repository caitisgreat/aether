(function() {
  'use strict';

  /**
   * Dependencies
   */
  const chai = require('chai');
  const chaiHttp = require('chai-http');
  const sinon = require('sinon');

  let expect = chai.expect;


  // initialize chai http
  chai.use(chaiHttp);

  /**
   * Tests
   */

  describe('Test API response from endpoint(s)', () => {
    let zipCode = 18015;
    let badZip = 'ABCDE';
    let host = "localhost"
    let port = 3000

    // GET /api/ping
    describe('GET /api/ping', () => {
      it(`ensures the reachability of the host (${host})`, (done) => {
        chai.request(`http://${host}:${port}`)
          .get('/api/ping')
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.property('ping').eql('pong');
            done();
          });
      });
    });

    // GET /api/location
    describe('GET /api/location', () => {
      it(`should fail if a location is not provided`, (done) => {
        chai.request(`http://${host}:${port}`)
          .get(`/api/location/`)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('error').eql('Location is required.');
            done();
          });
      });

      it(`should, on success, respond with location data for a valid location (zip code: ${zipCode})`, (done) => {
        chai.request(`http://${host}:${port}`)
          .get(`/api/location/${zipCode}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.property('location');
            expect(res.body.location).to.have.property('zip').eql(`${zipCode}`);
            done();
          });
      });
    });

    // GET /api/conditions
    describe('GET /api/conditions', () => {
      it(`should fail if a zip code is not provided`, (done) => {
        chai.request(`http://${host}:${port}`)
          .get(`/api/conditions/`)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('error').eql('Zip Code is required.');
            done();
          });
      });

      it(`should fail if the provided zip code (${badZip}) is invalid`, (done) => {
        chai.request(`http://${host}:${port}`)
          .get(`/api/conditions/${badZip}`)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('error').eql('Zip Code is invalid.');
            done();
          });
      });

      it(`should, on success, respond with weather condition data for a valid zip code (${zipCode})`, (done) => {
        chai.request(`http://${host}:${port}`)
          .get(`/api/conditions/${zipCode}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done();
          });
      });
    });

    // GET /api/forecast
    describe('GET /api/forecast', () => {
      it(`should fail if a zip code is not provided`, (done) => {
        chai.request(`http://${host}:${port}`)
          .get(`/api/forecast/`)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('error').eql('Zip Code is required.');
            done();
          });
      });

      it(`should fail if the provided zip code (${badZip}) is invalid`, (done) => {
        chai.request(`http://${host}:${port}`)
          .get(`/api/forecast/${badZip}`)
          .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.be.json;
            expect(res.body).to.have.property('error').eql('Zip Code is invalid.');
            done();
          });
      });

      it(`should, on success, respond with the weather forecast for a valid zip code (${zipCode})`, (done) => {
        chai.request(`http://${host}:${port}`)
          .get(`/api/forecast/${zipCode}`)
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            done();
          });
      });
    });

  });
})();
