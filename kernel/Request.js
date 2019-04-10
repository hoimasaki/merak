/*=============================================================================
#     FileName: Request.js
#         Desc: 
#       Author: Anakin Tu
#        Email: tuhui@bilibili.com
#     HomePage: https://github.com/sevnote
#      Version: 0.0.1
#   LastChange: 2018-08-01 15:57:03
#      History:
=============================================================================*/
var Future = require('fibers/future');
var request = require('request');

var header = {
    "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.101 Safari/537.36",
    "Content-Type": "application/json"
}

var request_base = {
    get: function(params) {
        var f = new Future;
        request({
            url: params.url,
            method: 'GET',
            headers: params.header ? params.header : header,
            timeout: 600000,
        }, function(err, res, body) {
            if (err) {
                console.info(err)
                f.
                return (false);
            } else {
                try {
                    f.
                    return (JSON.parse(body))
                } catch(e) {
                    f.
                    return (body)
                }
            }
        });
        return f.wait();
    },
    get_json: function(params) {
        var f = new Future;
        request({
            url: params.url,
            method: 'GET',
            qs: params.form,
            headers: params.header ? params.header : header,
            timeout: 600000,
        }, function(err, res, body) {
            if (err) {
                console.info(err)
                f.
                return (false);
            } else {
                f.
                return (JSON.parse(body))
            }
        });
        return f.wait();
    },
    post_json: function(params) {
        var f = new Future;
        request({
            url: params.url,
            method: 'POST',
            headers: params.header ? params.header : header,
            json: params.form,
            timeout: 60000
        }, function(err, res, body) {
            if (err) {
                console.info(err)
                f.
                return (false);
            } else {
                var cookies = res.headers['set-cookie'];
                f.
                return (body)
            }
        });
        return f.wait();
    },
    post_form: function(params) {
        var f = new Future;
        request({
            url: params.url,
            method: 'POST',
            headers: params.header ? params.header : header,
            form: params.form,
            timeout: 600000
        }, function(err, res, body) {
            if (err) {
                console.info(err)
                f.
                return (false);
            } else {
                var cookies = res.headers['set-cookie'];
                f.
                return (body)
            }
        });
        return f.wait();
    },
    put: function(params) {
        var f = new Future;
        request({
            url: params.url,
            method: 'PUT',
            headers: params.header ? params.header : header,
            body: JSON.stringify(params.form),
            timeout: 20000
        }, function(err, res, body) {
            if (err) {
                console.info(err)
                f.
                return (false);
            } else {
                var cookies = res.headers['set-cookie'];
                f.
                return (body)
            }
        });
        return f.wait();
    },
    opsmind_get: function(username, password, params) {
        var f = new Future;
        var option = {
            'user': username,
            'pass': password,
        }
        request({
            url: params.url,
            method: 'GET',
            auth: option
        }, function(err, res, body) {
            if (err) {
                console.info(err)
                f.
                return (false);
            } else {
                f.
                return (JSON.parse(body))
            }
        })
        return f.wait()
    },
    opsmind_post: function(username, password, params) {
        var f = new Future;
        var option = {
            'user': username,
            'pass': password,
        }
        request({
            url: params.url,
            headers: params.header ? params.header : header,
            method: 'POST',
            auth: option,
            json: params.form,
            timeout: 20000
        }, function(err, res, body) {
            if (err) {
                console.info(err)
                f.
                return (false);
            } else {
                f.
                return (body)
            }
        })
        return f.wait()
    }
}

module.exports = request_base

