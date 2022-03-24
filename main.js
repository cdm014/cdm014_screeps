var Tasks = require('creep-tasks');
var Traveler = require('Traveler');
require('Utils');
var Empire = require('Empire');
//var CreepRequest = require('CreepRequest');


module.exports.loop = function () {
  let spawn = Game.spawns['Spawn1'];
  spawn.SpawnBootstrapper("main loop");
 Empire.Init();
 Empire.Bootstrap();
 for (var roomName in Game.rooms) {
   let room = Game.rooms[roomName];
   //room.ScanRoomHealth();
  
   //console.log(roomName+" - "+STRUCTURE_SPAWN+" : "+room.BuildingScoreByType(STRUCTURE_SPAWN));

 }



  
};
