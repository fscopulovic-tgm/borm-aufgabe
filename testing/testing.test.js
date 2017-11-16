var request = require('request');
var superagent = require('superagent');
var my_server = require('../server.js');
var except = require('chai').except;
var base_url = 'http://localhost:3000';

describe('GET methods', function() {
  it('GET / should return status code 200', function() {
    request.get(base_url + '/', function(error, response, body) {
      except(response.statusCode).toBe(200);
      done();
    });
  });

  it('GET /signup should return status code 200', function() {
    request.get(base_url + '/signup', function(error, response, body) {
      except(response.statusCode).toBe(200);
      done();
    });
  });

  it('GET /login should return status code 200', function() {
    request.get(base_url + '/login', function(error, response, body) {
      except(response.statusCode).toBe(200);
      done();
    });
  });

  it('GET /profile should return status code 200',function() {
    request.get(base_url + '/profile', function(error, response, body) {
      except(response.statusCode).toBe(200);
      done();
    });
  });

  it('GET /logout should return status code 200', function() {
    request.get(base_url + '/logout', function(error, response, body) {
      except(response.statusCode).toBe(200);
      done();
    });
  });
});

describe('POST methods', function() {
  it('POST /login should return status code 200', function() {
    superagent.post(base_url + '/login')
              .send({ email: 'test@user', password: 'abc'})
              .end(function(error, res) {
                except(routes.isLoggedIn())
    });
    done();
  });

  it('POST /signup should return status code 200', function() {
    superagent.post(base_url + '/login')
              .send({ email: 'nein', name: 'test', password: 'xd'})
              .end(function(error, res) {
                console.log(res);
   });
   done();
  });
});

my_server.closeServer;
