var Future = require('fibers/future');
var jayson = require('jayson');


var rpc_base = function (config) {
    const client = jayson.client.tcp(config);
    console.log(config)
    this.call = function (param) {
        var f = new Future;
        client.request(param.methods, param.data, function (err, response) {
            if (err) throw err;
            f.return(response)
        });
        return f.wait();
    }
}
module.exports = rpc_base
