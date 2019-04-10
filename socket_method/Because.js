var redis = require('redis');
var sub = redis.createClient()

var socket_base = function(http) {

    this.action = function() {
        var io = require('socket.io')(http);
        io.on('connection', function(client) {

            client.on('disconnect', function() {
                console.log("有一个用户断开了连接")
            })

            client.on('leave', function(data) {
                var emit_data = {
                    "username": data.username,
                    "action": "leave"
                }
                console.log(emit_data)
                client.broadcast.emit('bye', emit_data)
            })


            client.on('join', function(data) {
                var emit_data = {
                    "username": data.username,
                    "action": "join"
                }
                console.log(emit_data)
                client.broadcast.emit('hi', emit_data)
            });


            client.on('sub', function(data) {
                sub.subscribe(data.username+"-sub")
                sub.on("message", function(channel, message) {
                    var data = JSON.parse(message)
                    client.emit('stream', data)
                })
            })
        });

        return true
    }

}

module.exports = socket_base
