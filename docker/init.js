var jsonfile = require('jsonfile')
var read_file = '/data/api-gateway/config/config.json.template'
var write_file = '/data/api-gateway/config/config.json'

jsonfile.readFile(read_file, function(err, obj) {

    let app_port = process.env.APP_PORT
    let mysql_host = process.env.MYSQL_HOST
    let mysql_user = process.env.MYSQL_USER
    let mysql_pass = process.env.MYSQL_PASS
    let mysql_db = process.env.MYSQL_DB

    let redis_host = process.env.REDIS_HOST
    let redis_port = process.env.REDIS_PORT
    let redis_db = process.env.REDIS_DB << << << < HEAD

    let transfer_host = process.env.TRANSFER_HOST
    let transfer_port = process.env.TRANSFER_PORT

    obj.development.app_port = app_port
    obj.development.redis.host = redis_host
    obj.development.redis.port = redis_port
    obj.development.redis.select = redis_db
    obj.development.transfer.host = transfer_host
    obj.development.transfer.port = transfer_port

    obj.production.app_port = app_port
    obj.production.redis.host = redis_host
    obj.production.redis.port = redis_port
    obj.production.redis.select = redis_db << << << < HEAD
    obj.production.transfer.host = transfer_host
    obj.production.transfer.port = transfer_port


    jsonfile.writeFile(write_file, obj, function(err) {
        console.log(err)
        jsonfile.writeFile(write_file, obj, function(err) {
            if (err != null) {
                console.log(err)
            } else {
                console.log('init finish')
            }
        })
    })
})
