var bigiq = require('./bigclient');
var ipaddr = 'ip';
var bigUrl = 'https://'+ ipaddr +'/mgmt';

bigiq.login({
  uri : bigUrl + '/shared/authn/login',
  method : 'POST',
  user : 'user',
  pass : 'password',
  data : {
    username : 'user',
    password : 'password'
  },
})
.then(function(token) {
  if (token) {
    return bigiq.echo({
      uri    : bigUrl + '/shared/echo',
      method : 'GET',
      data   : {}
    })
  }
})
.then(function(echo) {
  console.log(echo);
})
