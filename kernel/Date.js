var Future = require('fibers/future')

exports.date = function () {
    var myDate = new Date()
    var month = (myDate.getMonth() < 9) ? "0" + (myDate.getMonth() + 1) : "" + (myDate.getMonth() + 1)
    var day = (myDate.getDate() < 10) ? "0" + myDate.getDate() : "" + myDate.getDate()
    var today = myDate.getFullYear() + '_' + month  + '_' + day
    global.today = today
    return today
}
