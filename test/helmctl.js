var expect = require('chai').expect
	, h = require('../index.js')
	, assert = require('chai').assert

var helm = h.helm({binary: '/opt/helm/helm'});

describe('helm',function() {
    this.timeout(1000000);
    
    it('searches all of helm', function(done){
	helm.search(null, function(err, data){
	    done();
	});
    });

    it('searches for one of helms packages', function(done){
	helm.search('rabbitmq', function(err, data){
	    assert(data.length == 1)
	    console.log(data);
	    done();
	});
    });

    it('gets info for one of helms packages', function(done){
	helm.search('rabbitmq', function(err, data){
	    helm.info(data[0].name, function(err, pkg){
		console.log(data);
		done();
	    });
	});
    });
});
