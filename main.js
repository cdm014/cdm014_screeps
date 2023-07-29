let Tasks = require('creep-tasks');
let Bootstrapper = require('roleBootstrapper');
var Traveler = require('Traveler');
let Role = require('CreepRole');
let _ProcessTable = require('ProcessTable');
require('Utils');
var Empire = require('Empire');
//var CreepRequest = require('CreepRequest');


module.exports.loop = function () {
  let spawn = Game.spawns['Spawn1'];
  //spawn.SpawnBootstrapper("main loop");
  var ProcessTable = new _ProcessTable()
  var v_Empire = new  Empire();
  console.log(ProcessTable.getNextId())
  
 v_Empire.Init();
 v_Empire.Bootstrap();
 for (var roomName in Game.rooms) {
   let room = Game.rooms[roomName];
   room.ScanRoomHealth();
  
   //console.log(roomName+" - "+STRUCTURE_SPAWN+" : "+room.BuildingScoreByType(STRUCTURE_SPAWN));

 }

 for (var cname in Game.creeps) {
   let creep = Game.creeps[cname];
   console.log("Creep Name: "+cname);
   //set tasks for bootstrappers
   if (creep.memory.role == Role.BOOTSTRAPPER) {
     console.log( cname + " is bootstrapper");
     if (creep.isIdle) {
       console.log("setting bootstrapper task");
       Bootstrapper(creep);
     }
   }
   creep.run();
 }




  
};
