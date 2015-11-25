# Nodejs Helm.sh client

This is a Node.js client library for the helm.sh program. 

Install:
```
   npm install helmjs
```
# Usage

## Create a Client
```js
var helmjs = require('helmjs');

var helm = helmjs.helm({binary: '/opt/helm/helm'});

// get a full list of helm packages
helm.list(function(err, data){
  done();
});

// search for a specific package
helm.search('rabbitmq', function(err, data){
  console.log(data);
  done();
});

// get detailed info on a package
helm.info('rabbitmq', function(err, pkg){
  console.log(data);
  done();
});
```
