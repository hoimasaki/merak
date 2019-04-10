var Future = require('fibers/future');
var req = require('./Request');
var redis = require('./Redis');
var moment = require('moment');
var _redis = new redis(config.redis);

var service_tree_base = function() {

    var user_name = config.service_tree.user_name
    var platform_id = config.service_tree.platform_id

    this.get_token = function() {
        if (!_redis.exists('service_tree_token')) {
            var params = {
                'url': 'http://easyst.bilibili.co/v1/token',
                'form': {
                    user_name: user_name,
                    platform_id: platform_id
                }
            }
            var token_res = req.post_json(params)
            var ttl = token_res.data.expired - moment().format('X') - 1000
            _redis.setttl('service_tree_token', token_res.data.token, ttl)
            var token = token_res.data.token
        } else {
            var token = _redis.get('service_tree_token')
        }
        return token
    }
}

module.exports = service_tree_base
