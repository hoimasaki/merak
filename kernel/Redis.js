var Future = require('fibers/future');
var redis = require('redis');

var redis_base = function(config) {

    var client = redis.createClient(config.port, config.host)
    //client.auth(config.password)
    client.select(config.select)
    this.llen = function(key) {
        var f = new Future;
        client.llen(key, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }
    this.lpush = function(key, value) {
        var f = new Future;
        client.lpush(key, value, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }

    this.rpop = function(key) {
        var f = new Future;
        client.rpop(key, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }

    this.brpop = function(key, num) {
        var f = new Future;
        client.brpop(key, num, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }

    this.exists = function(key) {
        var f = new Future;
        client.exists(key, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }


    this.lrange = function(key, start, end) {
        var f = new Future;
        client.lrange(key, start, end, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }

    this.set = function(key, value) {
        var f = new Future;
        client.set(key, value, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }

    this.setttl = function(key, value, ttl) {
        var f = new Future;
        client.set(key, value, 'EX', ttl, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }

    this.get = function(key) {
        var f = new Future;
        client.get(key, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }

    this.hget = function(key, field) {
        var f = new Future;
        client.hget(key, field, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }

    this.expire = function(key, value) {
        var f = new Future;
        client.expire(key, value, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }

    this.keys = function(key) {
        var f = new Future;
        client.keys(key, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }

    this.ttl = function(key) {
        var f = new Future;
        client.ttl(key, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }
    this.incr = function(key) {
        var f = new Future;
        client.incr(key, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }

    this.zadd = function(key, score, value) {
        var f = new Future;
        client.zadd(key, score, value, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }

    this.zrange = function(key, min, max) {
        var f = new Future;
        client.zrange(key, min, max, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }


    this.zrangebyscore = function(key, minscore, maxscore) {
        var f = new Future;
        client.zrangebyscore(key, minscore, maxscore, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }

    this.mbrpop = function(key1, key2, key3, timeout) {
        var f = new Future;
        client.brpop(key1, key2, key3, timeout, function(error, response) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (response)
            }
        });
        return f.wait();
    }

    this.pub = function(channel,message) {
        var f = new Future;
        client.publish(channel,message, function(error, response) {
            if (error) {
                f.
                return (false)
            } else {
                f.
                return (response)
            }
        })
        return f.wait();
    }

    this.sub = function(key) {
        var f = new Future;
        client.subscribe(key, function(error, response) {
            if (error) {
                f.
                return (false)
            } else {
                f.
                return (response)
            }
        })
        return f.wait();
    }


}

module.exports = redis_base

