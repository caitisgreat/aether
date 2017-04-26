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
    let zipcode = 18015;
    let host = "localhost"
    let port = 3000

    // GET /api/ping
    describe('GET /api/ping', () => {
      it(`ensures the reachability of the host (${host}) on an IP network`, (done) => {
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
      it(`returns location data for zip code ${zipcode}`, (done) => {
        chai.request(`http://${host}:${port}`)
          .get(`/api/location/${zipcode}`)
          .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res).to.be.json;
            expect(res.body).to.have.property('location');
            expect(res.body.location).to.have.property('zip').eql(`${zipcode}`);
            done();
          });
      });
    });

    /*
        // GET /api/conditions
        describe('GET /api/conditions', () => {
          it('returns current weather conditions for zip code 18015', (done) => {
            chai.request(`http://${host}:${port}`)
              .get(`/api/conditions/${zipcode}`)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
              });
          });
        });

        // GET /api/forecast
        describe('GET /api/forecast', () => {
          it(`returns the weather forecast for zip code ${zipcode}`, (done) => {
            chai.request(`http://${host}:${port}`)
              .get(`/api/forecast/${zipcode}`)
              .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
              });
          });
        });
    */
  });
})();
