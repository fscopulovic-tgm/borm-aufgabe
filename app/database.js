// A class that contains the couchbase connection
var couchbase = require('couchbase');

module.exports = {
  var cluster = new couchbase.Cluster('couchbase://localhost:8091/')
  cluster.authenticate('Administrator', 'Filip1202');
  var bucket = cluster.openBucket('users');

  upsertUser(json) {
    bucket.upsert(json, (err, result) => {
      if (err) throw err;
    }
  });
};
