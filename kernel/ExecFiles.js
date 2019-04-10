var Future = require('fibers/future')
const exec = require('child_process').exec

exports.exec_cmd = function (cmd, path, timeout) {
    if (!timeout) timeout = 1000
    var f = new Future;
    var bat = exec(cmd, {
        cwd: path,
        timeout: timeout
    }, function (err, stdout) {
        if (err) {
            logger.error(err)
            f.
                return(false);
        } else {
            f.
                return(stdout)
        }
    })
    return f.wait();
}

