var request = require('request')
var server_app = require('../server.js')
var base_url = "http://localhost:3000"

describe('SYT GK9.3 Testing', function() {
  describe('GET /', function() {
    it('Index Page return status code 200', function() {
      request.get(base_url, function(error, response, body) {
        console.log(body);
        except(response.statusCode).toBe(200);
        server_app.closeServer();
        done();
      });
    });
  });
});
