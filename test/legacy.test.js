var tape = require('tape');
var Carmen = require('..');
var mem = require('../lib/api-mem');

tape('legacy version (pre-v1 => ok)', function(assert) {
    var c = new Carmen({
        test: new mem({ maxzoom:6, geocoder_version:null }, function() {})
    });
    c.geocode('test', {}, function(err, res) {
        assert.ifError(err);
        assert.equal(res.features.length, 0);
        assert.end();
    });
});

tape('legacy version (v1 => error)', function(assert) {
    var c = new Carmen({
        test: new mem({ maxzoom:6, geocoder_version:1 }, function() {})
    });
    c.geocode('test', {}, function(err, res) {
        assert.ok(err);
        assert.deepEqual(err.toString(), 'Error: geocoder version is not 2 or 3, index: test');
        assert.end();
    });
});

tape('current version (v2 => ok)', function(assert) {
    var c = new Carmen({
        test: new mem({ maxzoom:6, geocoder_version:2 }, function() {})
    });
    c.geocode('test', {}, function(err, res) {
        assert.ifError(err);
        assert.equal(res.features.length, 0);
        assert.end();
    });
});
