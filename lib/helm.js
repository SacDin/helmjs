var spawn = require('child_process').spawn

function Helm(conf){
    this.binary = conf.binary || 'helm'
}

Helm.prototype.spawn = function(args, done)
{
    var helm = spawn(this.binary, args)
    , stdout = ''
    , stderr = ''
    helm.stdout.on('data', function (data) {
	stdout += data
    })
    
    helm.stderr.on('data', function (data) {
	stderr += data
    })
    
    helm.on('close', function (code) {
	if( !stderr )
	    stderr = undefined
	done(stderr, stdout)
    })
}

Helm.prototype.search = function(search, done)
{
    if ( ! search ) { return(new Exception("you must supply a search name")) }
    this.spawn(['search', search], function(err, data){
	returnData = [];
	for(var i = 0; i < data.split(/\r?\n/).length; i++){
	    var line = data.split(/\r?\n/)[i];
	    var packageName = line.split(' ')[0]
	    if (!packageName || packageName.length == 0) { continue; }
	    ret = {};
	    ret.name = packageName.trim();
	    ret.description = line.trim();
	    returnData.push(ret);
	}
	if (err) {
	    done(err, data);
	} else {
	    done(null, returnData);
	}
    })
}

Helm.prototype.list = function(done)
{
    this.spawn(['search'], function(err, data){
	returnData = [];
	for(var i = 0; i < data.split(/\r?\n/).length; i++){
	    var line = data.split(/\r?\n/)[i];
	    var packageName = line.split(' ')[0]
	    if (!packageName || packageName.length == 0) { continue; }
	    ret = {};
	    ret.name = packageName.trim();
	    ret.description = line.trim();
	    returnData.push(ret);
	}
	if (err) {
	    done(err, data);
	} else {
	    done(null, returnData);
	}
    })
}

Helm.prototype.info = function(name, done)
{
    
    this.spawn(['info', name], function(err, data){
	var retObj = {};
	for(var i = 0; i < data.split(/\r?\n/).length; i++){
	    var line = data.split(/\r?\n/)[i];
	    if ( line.indexOf(":") == -1 ) { continue; }
	    var prop = line.split(':')[0].trim().toLowerCase();
	    var val = line.replace(line.split(':')[0] + ":", '').trim();
	    if(prop.length == 0 ) { continue; };
	    retObj[prop] = val || '';
	}	
	if (err) {
	    done(err, data);
	} else {
	    done(null, retObj);
	}
    })
}

Helm.prototype.install = function(name, done)
{
    
    this.spawn(['install', name], function(err, data){
	if (err) {
	    done(err, data);
	} else {
	    done(null, data);
	}
    })
}

Helm.prototype.update = function(done)
{
    this.spawn(['update'], function(err, data){
	if (err) {
	    done(err, data);
	} else {
	    done(null, data);
	}
    })
}

module.exports = function(conf)
{
    cnf = conf || {};
    return new Helm(cnf);
}
