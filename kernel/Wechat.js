var Future = require('fibers/future');
var req = require('./Request');
var redis = require('./Redis');
var util = require('util');
var _redis = new redis(config.redis)

var wechat_base = function() {

    this.get_access_token = function(corpid,corpsecret) {
        if (!_redis.exists('wechat_access_token')) {
            var params = {
                'url': 'https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=' + corpid + '&corpsecret=' + corpsecret
            }
            temp_token = req.get(params)
            var token_res = req.get(params)
            _redis.setttl('wechat_access_token', token_res.access_token, token_res.expires_in)
            var token = token_res.access_token
        } else {
            var token = _redis.get('wechat_access_token')
        }
        return token
    }

    this.get_login_user = function(corpid,corpsecret,code){
        var params = {
           'url': util.format("https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=%s&code=%s",this.get_access_token(corpid,corpsecret),code)
        }
        user = req.get(params)
        return user
    }

}

module.exports = wechat_base
