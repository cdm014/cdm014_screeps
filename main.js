var Tasks = require('creep-tasks');
var Traveler = require('Traveler');
var Utils = require('Utils');
var Empire = require('Empire');


module.exports.loop = function () {
 Empire.Init();
 for (var roomName in Game.rooms) {
   let room = Game.rooms[roomName];
   //room.ScanRoomHealth();
  
   //console.log(roomName+" - "+STRUCTURE_SPAWN+" : "+room.BuildingScoreByType(STRUCTURE_SPAWN));
 }



  
};
