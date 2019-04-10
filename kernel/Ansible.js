var log4js = require("log4js")
var Ansible = require('node-ansible');
var util = require('util');
var _ = require('underscore');
var Future = require('fibers/future');


var ansible_lib = function() {

    this.run = function(host, module, args = "", command = "") {
        var f = new Future;
        command = new Ansible.AdHoc().hosts(host).module(module).args(args, command);
        command.forks(5)
        command.inventory('/etc/ansible/hosts')
        var promise = command.exec()
        console.log(promise)
        promise.then(function(result) {
            console.log(promise)
            console.log("-====")
            console.log(result)
            result = result.output
            console.log("!!!!!!!!!!")
            console.log(result)
            console.log("!!!!!!!!!!!!!")
            result = result.replace(/\n/g, " ").replace(/\r/g, "")
            result = result.split("|")
            obj = {}
            obj.hosts = result[0].trim()
            obj.status = result[1].trim()
            var result_output = result[2].split(">>")
            var rc_code = result_output[0].split("=")[1]
            obj.rc = rc_code.trim()
            obj.output = result_output[1].trim()
            console.log(obj)
            f.
            return (obj)
        })
        return f.wait();
    }


    this.playbook = function(file, vars = {}) {
        var f = new Future;
        command = new Ansible.Playbook().playbook(file).variables(vars);
        var promise = command.exec()

        console.log(promise)
        console.log(command)


        promise.then(function(error){
            console.log(promise)
            console.log(result) 
            f.return(false)
        },function(result){
            f.return(result)
        })

        return f.wait();

    }
}


module.exports = ansible_lib
