var redis = require("./Redis")
var util = require('util')
var _ = require('underscore')


var cache = function(config) {
    _redis = new redis(config.redis)

    this.key = function(input_params) {
        var obj_key = ""

        for (var row in input_params) {
            if (row === 'ReqId'){
                continue;
            }
            else if (typeof(input_params[row]) === 'object') {
                _.each(input_params[row], function(jow) {
                    var key_result = "_" + _.keys(jow) + '_' + _.values(jow)
                    obj_key += key_result
                })
            } else {
                obj_key += '_' + row + '_' + input_params[row]

            }

        }
        var obj_key = obj_key.toLowerCase()
        return obj_key
    }

    this.write = function(key, result) {
        _redis.setttl(key, JSON.stringify(result),86400)
        return result
    }

    this.read = function(key) {
        var result = _redis.get(key)
        return result
    }

}


module.exports = cache
