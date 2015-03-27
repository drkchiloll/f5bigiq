var request = require('request'),
    Q       = require('q');

var client;

function Client(options) {
  this.token = options.token || null;
  if (this.token) headers['X-F5-Auth-Token'] = this.token;
  this.reqOptions = {
    uri       : options.uri,
    method    : options.method,
    auth      : { user : options.user, pass : options.pass },
    header    : {
      'Content-Type' : 'application/json',
      'Accept'       : 'application/json'
    },
    strictSSL : false,
    json      : options.data
  };
};

Client.prototype._req = function() {
  var deferred = Q.defer();
  var resData = '';
  request(this.reqOptions)
    .on('data', function(data) {
      resData += data;
    })
    .on('end', function(res) {
      deferred.resolve(resData);
    })
    return deferred.promise;
};

exports.login = function(options) {
  var deferred = Q.defer();
  client = new Client(options);
  client._req()
    .then(function(data) {
      var login = JSON.parse(data);
      if (login.token.token) client.token = login.token.token;
      deferred.resolve(login.token.token);
    });
  return deferred.promise;
};

exports.echo = function(echo) {
  var deferred = Q.defer();
  client.reqOptions.json = echo.data;
  client.reqOptions.uri = echo.uri;
  client.reqOptions.method = echo.method;
  client._req()
    .then(function(resp) {
      deferred.resolve(resp);
    });
  return deferred.promise;
}
