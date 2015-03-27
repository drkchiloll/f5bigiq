import requests
import json
import yaml
import sys
#Essential Variables
ipaddr = 'ip'
bigUrl = 'https://%s/mgmt' % ipaddr
user = 'username'
pwd = 'password'
#REQ Headers
headers = {
  'Content-Type' : 'application/json',
  'Accept'       : 'application/json'
}
#JSON Object Passed in POST REQ
loginData = {
  'username' : user,
  'password' : pwd
}

#Login to BigIQ
loginReq = requests.post(
  url=bigUrl + '/shared/authn/login',
  data=json.dumps(loginData),
  headers=headers,
  auth=(user, pwd),
  verify=False
)

#Check for Successful Login
if loginReq.status_code == 200:
  #Get Login Token Of Successful Login
  token = yaml.load(loginReq.text)['token']['token']
else:
  print 'Login was unsuccessful.'
  sys.exit(1)

#Add the Token to the Header
headers['X-F5-Auth-Token'] = token
#See the New Token Attached to the HEADER
#print headers

#Make Sample ECHO Call to BigIQ for Testing Token REQ
echoReq = requests.get(
  url=bigUrl + '/shared/echo',
  data=None,
  headers=headers,
  auth=(user, pwd),
  verify=False)

#Check for Successful Echo
if echoReq.status_code == 200:
  print yaml.load(echoReq.text)
else:
  print 'Echo RESP not Received.'
