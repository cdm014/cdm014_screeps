var CreepRequests = require('CreepRequest');
var CreepRole = require('CreepRole');


class Empire {

  constructor () {
    this.name = "Empire";

  }
  //#region Empire Initialization
  Init() {
   if (Memory.config == undefined) {
     Memory.config = {};
   }
   if (Memory.config.roomBalance == undefined) {
    Memory.config.roomBalance = 4; //an energy source must have 4 creeps targeting before it's worth a different room
   }

   //set initial structure storage percent goals
   //I expect to have the scripts change this dynamically over time
   if (Memory.config.store == undefined) {
     Memory.config.store = {};
     Memory.config.store[RESOURCE_ENERGY] = 100;
   }

    if (Memory.rooms == undefined) {
      Memory.rooms = {};
    }
    if (Game.Sources == undefined) {
      Game.Sources = [];
    }
    if (Game.Controllers == undefined) {
      Game.Controllers = [];
    }
  };
  //#endregion
 
  //#region bootstrap
  //bootstrapping our empire
  Bootstrap() {
    //bootstrapping only matters if we only have one room and no creeps
    //bootstrapping the empire includes spawning a bootstrapper for a room but is not quite the same thing
    let rooms = _.keys(Game.rooms);
    let screeps = _.keys(Game.creeps);
    if (rooms.length == 1 && screeps.length == 0) {
      let spawns = _.keys(Game.spawns);
      let spawnName = spawns[0];
      let spawn = Game.spawns[spawnName];
      console.log ("bootstrapper: "+spawn.SpawnBootstrapper("Empire Bootstrap()")); 
      
    }
  }
  //#endregion



}

module.exports = Empire;