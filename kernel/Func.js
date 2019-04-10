/*=============================================================================
#     FileName: Func.js
#         Desc: 
#       Author: Anakin Tu
#        Email: tuhui@bilibili.com
#     HomePage: https://github.com/sevnote
#      Version: 0.0.1
#   LastChange: 2018-05-28 16:45:15
#      History:
=============================================================================*/

var _ = require("underscore");
var response_code = require("../mapping/response_code");
var names_code = require("../mapping/names_code");
var util = require("util");
var md5 = require("md5");
var crypto = require('crypto');
var querystring = require('querystring');


var Func = {
    generateErrorCode: function(error_code, params) {
        var error_info = null;
        if (error_info = response_code[error_code]) {
            if (params && params.length) {
                var _params = [error_info.Message].concat(params);
                var tmp = _.extend({}, error_info);
                tmp.Message = util.format.apply(this, _params);
                return tmp;
            } else {
                return error_info;
            }
        }
        return {
            RetCode: -1
        };
    },
    getProductDomain: function(product_name) {
        if (product_domain[product_name]) {
            return product_domain[product_name];
        }
        return false;
    },
    keySort: function(params) {
        var keys = _.keys(params),
            params_sort = {};
        keys.sort();
        _.each(keys, function(key) {
            params_sort[key] = params[key];
        });
        return params_sort;
    },
    sha1: function(str) {
        var crypto = require("crypto").createHash("sha1");
        return crypto.update(str, 'utf8').digest('hex');
    },
    bap_signature: function(params, secret) {
        params_data = "";
        var params = this.keySort(params);
        var sign_str = querystring.stringify(params)
        //处理特殊字符
        sign_str = sign_str.replace(/\(/g, "%28");
        sign_str = sign_str.replace(/\)/g, "%29");
        sign_str = sign_str.replace(/\%20/g, "+");
        sign_str = sign_str.replace(/!/g, '%21');
        sign_str = sign_str.replace(/\*/g, '%2A');
        sign_str = sign_str.replace(/#/g, '%23');
        sign_str = sign_str.replace(/@/g, '%40');

        var sign_data = sign_str + secret
        var signature = md5(sign_data)
        return signature
    },
    cmdb_signature: function(params) {
        params_data = "";
        var params = this.keySort(params);
        var sign_str = querystring.stringify(params)
        //处理特殊字符
        sign_str = sign_str.replace(/\(/g, "%28");
        sign_str = sign_str.replace(/\)/g, "%29");
        sign_str = sign_str.replace(/\%20/g, "+");
        sign_str = sign_str.replace(/!/g, '%21');
        sign_str = sign_str.replace(/\*/g, '%2A');
        sign_str = sign_str.replace(/#/g, '%23');
        sign_str = sign_str.replace(/@/g, '%40');

        var signature = md5(sign_str)
        return signature
    },
    checkPermission: function(bitmaps, pos) {
        var p = Math.floor(pos / 8);
        var y = pos % 8;
        if (bitmaps[p]) {
            return ((1 << (7 - y)) & bitmaps[p]) ? true : false;
        }
        return false;
    },
    getNameList: function(namespace) {
        if (names_code[namespace]) {
            return names_code[namespace];
        }
        return false;
    },
    getCodeByName: function(namespace, name) {
        if (names_code[namespace] && names_code[namespace][name] !== undefined) {
            return names_code[namespace][name];
        }
        return false;
    },
    getNameByCode: function(namespace, code) {
        var ret = false;
        var codeInt = parseInt(code, 10);
        _.some(_.keys(names_code[namespace]), function(curKey) {
            if (_.isNaN(codeInt)) {
                if (names_code[namespace][curKey] === code) {
                    ret = curKey;
                    return true;
                }
            } else {
                if (names_code[namespace][curKey] === codeInt) {
                    ret = curKey;
                    return true;
                }
            }
        });
        return ret;
    },
    getNameByCodeNew: function(namespace, code) {
        code = code && code.toString();
        var _names = names_code[namespace];
        if (_names) {
            for (key in _names) {
                if (key == code) {
                    return _names[key];
                }
            }
        }
        return false;
    },
    CheckIntOrIntString: function(num) {
        return (parseInt(num) !== NaN) && (String(parseInt(num)) === String(num))
    },
    checkStatusAvailable: function(status) {
        if (status && !['resolved', 'firing'].includes(status)) {
            return false;
        }
        return true;
    },
}

module.exports = Func;
