var Future = require('fibers/future');
var WALIYUN = require('waliyun');

var aliyun_base = function() {

    var options = {
        'AccessKeyId':  config.aliyun.access_key_id,
        'AccessKeySecret': config.aliyun.access_key_secret,
        'RegionId': 'cn-hangzhou'
    };

    this.phonecall = function(params) {
        var f = new Future;
        var call = WALIYUN.dyvms(options)
        call.singleCallByTts(params).then(function(res) {
            f.
            return (res)
        }).
        catch (function(err) {
            console.info(err)
            f.
            return (false)
        })
        return f.wait();
    }

}
module.exports = aliyun_base
