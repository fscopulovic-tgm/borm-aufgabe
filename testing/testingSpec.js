var request = require('request')
var server_app = require('../server.js')
var except = require('chai').except
fs = require('fs')
var base_url = "http://localhost:3000"
var index_body = fs.readFile(require('path').resolve(__dirname, '../views/index.ejs'), 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
});

var signup_body = fs.readFile(require('path').resolve(__dirname, '../views/signup.ejs'), 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
});

var login_body = fs.readFile(require('path').resolve(__dirname, '../views/login.ejs'), 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
});

var profile_body = fs.readFile(require('path').resolve(__dirname, 'mockup_profile.ejs'), 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
});

describe('SYT GK9.3 Testing', function() {
  describe('GET /', function() {
    it('GET Index returns status code 200', function() {
      request.get(base_url, function(error, response, body) {
        except(response.statusCode).toBe(200);
        done();
      });
    });

    it('See if it matches the index.ejs', function() {
      request.get(base_url, function(error, response, body) {
        except(body).toBe(index_body);
        done();
      });
    })
  });

  describe('GET /signup', function() {
    it('GET Signup returns status code 200', function() {
      request.get(base_url, function(error, response, body) {
        except(response.statusCode).toBe(200);
        done();
      });
    });

    it('See if it matches the signup.ejs', function() {
      request.get(base_url, function(error, response, body) {
        except(body).toBe(signup_body);
        server_app.closeServer();
        done();
      });
    })
  });
});
