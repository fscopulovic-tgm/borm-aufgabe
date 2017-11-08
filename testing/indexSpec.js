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

describe('SYT GK9.3 Testing', function() {
  describe('GET /', function() {
    it('Index Page return status code 200', function() {
      request.get(base_url, function(error, response, body) {
        except(response.statusCode).toBe(200);
        done();
      });
    });

    it('See if it matches the index.ejs', function() {
      request.get(base_url, function(error, response, body) {
        except(body).toBe(index_body);
        server_app.closeServer();
        done();
      });
    })
  });
});
