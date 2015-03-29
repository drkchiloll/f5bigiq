#F5 BigIQ API Integration
Example Login to BigIQ 4.5 utilizing its REST API and performing an Echo Test of the successful login

#####Python Requirements
1. Python 2.7
2. Requests Library (pip install requests || easy_install requests)

#####Running the Python Script
From the CLI:

```
python bigclient.py
```

#####Node Requirements
1. Node Version for Examples: v0.10.32
2. Request: npm install request
3. Q/Promises: npm install q

#####Running the Node Script
From a CLI in the root directory where the files exist issue the following commands:

```
npm install
node bigiq.js
```

######BASIC Authentication
URL Path: /sharedauthn/login POST

A JSON OBJECT must be passed in an Auth Attempt:

```
//Request Options
{
  uri 	 : URL,
  method : POST,
  //BASIC AUTHORIZATION
  auth   : {
  	user : user,
  	pass : pass
  },
  header : header
  json   : {
  	username : user,
  	password : pass
  }
}
//In the Case of Using LDAP
//A Login Ref to the LDAP UUID on the BigIQ must be Obtained
{
  'username'       : user,
  'password'       : pass,
  'loginReference' : {
    'link' : ldap_link
  }
}
```

On Successful Login, an Object is returned with various properties, one of these being the users Token to use in a specific HEADER on successive REQs. You also have to continuing passing the AUTH properties in the REQ Options (this is the BASIC AUTH Header)

'X-F5-Auth-Token'
