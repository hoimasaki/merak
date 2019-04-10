var Future = require('fibers/future');
var _ = require('underscore');
var opentsdb = require('opentsdb')
var client = opentsdb.client()
var mQuery = opentsdb.mquery()

var tsdb_base = function(config) {

    this.query = function(metric, start, end, tags, downsample, agg = 'avg', rate = false) {
        var f = new Future;
        if (!downsample) {
            var stamp = end - start
            if (stamp < 2 * 60 * 60 * 1000) {
                downsample = '1m-avg'
            } else if (2 * 60 * 60 * 1000 <= stamp && stamp < 10 * 60 < 60 * 60 * 1000) {
                downsample = '2m-avg'
            } else if (10 * 60 * 60 * 1000 <= stamp && stamp < 20 * 60 < 60 * 60 * 1000) {
                downsample = '10m-avg'
            } else if (20 * 60 * 60 * 1000 <= stamp && stamp < 48 * 60 < 60 * 60 * 1000) {
                downsample = '30m-avg'
            } else if (stamp >= 48 * 60 < 60 * 60 * 1000) {
                downsample = '1h-avg'
            }
        }
        mQuery
            .aggregator(agg)
            .downsample(downsample)
            .rate(rate)
            .metric(metric)
        if (tags) mQuery.tags(tags[0], tags[1])


        client
            .host(config.host)
            .port(parseInt(config.port))
            .ms(true)
            .tsuids(true)
            .arrays(true)
            .annotations('all')
            .start(start)
            .end(end)
            .queries(mQuery)
            .get(function onData(error, data) {
                if (error) {
                    console.info(error);
                    f.
                    return (false);
                } else {
                    f.
                    return (data);
                }
            });
        return f.wait();
    }

}

module.exports = tsdb_base;
