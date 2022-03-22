class Empire {
  static Init() {
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
  }
  



}

module.exports = Empire;