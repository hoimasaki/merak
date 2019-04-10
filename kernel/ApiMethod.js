var _ = require("underscore");
var moment = require("moment");
var Func = require("./Func");

var ApiMethod = function(input, task, header) {
    var self = this;
    this.initialize.apply(this, arguments);
}

ApiMethod.prototype.initialize = function(input, task) {
    var self = this;
    self.input = input;
    self.task = task;
    self.output = {
        "ReqId": Func.sha1(self.input.Action.toLowerCase() + moment().unix() * 1000 + moment().milliseconds().toString()),
        "Action": self.input.Action
    }
    var log = _.extend(JSON.parse(JSON.stringify(self.input)), JSON.parse(JSON.stringify(self.output)))
    self.input = log
}


ApiMethod.prototype.process = function() {

}


ApiMethod.prototype.fake = function() {

}



ApiMethod.prototype.checkParams = function(keys) {
    var self = this;
    var emptyParams = [];
    for (var index in keys) {
        var key = keys[index];
        if (_.isEmpty(self.input[key]) && _.isEmpty(self.input[key + '.0'])) {
            if (!_.isBoolean(self.input[key]) && !_.isNumber(self.input[key])) {
                emptyParams.push(key);
            }
        }
    }
    if (emptyParams.length > 0) {
        self.output = Func.generateErrorCode("MISSING_PARAMS", emptyParams);
        return false;
    } else {
        return true;
    }
};




var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;
    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, "constructor")) {
        child = protoProps.constructor;
    } else {
        child = function() {
            return parent.apply(this, arguments);
        };
    }
    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);
    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function() {
        this.constructor = child;
    };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);
    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;
    return child;
};

ApiMethod.extend = extend;

module.exports = ApiMethod;
