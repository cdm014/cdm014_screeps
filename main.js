var Tasks = require('creep-tasks');
var Context = require('Context');
var Processes = require('Processes');
module.exports.loop = function () {
    console.log('Tick started: ' + Game.time);
    //set up bot base
    let _Context = new Context (Game, Memory, PathFinder);
    let _Processes = new Processes(_Context);
    



    console.log('Tick ended\n--------------------');
}