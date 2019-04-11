var Future = require('fibers/future');
var nodemailer = require('nodemailer');

var email_base = function() {

    var transporter = nodemailer.createTransport({
        host:'smtp.exmail.qq.com',
        secureConnection: true, // use SSL
        port: 465,
        secure: true, // secure:true for port 465, secure:false for port 587
        auth:{
            user: 'no-reply@xxx.com',
            pass: 'xxx'
        },
    });

    this.send = function(param) {
        var f = new Future;
        transporter.sendMail(param, function(error, info) {
            if (error) {
                console.info(error)
                f.
                return (false);
            } else {
                f.
                return (info)
            }
        })
        return f.wait();
    }
}

module.exports = email_base
