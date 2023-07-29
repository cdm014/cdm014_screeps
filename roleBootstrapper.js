let Tasks = require("creep-tasks");
const { __esModule } = require("./Traveler");

let Bootstrapper = function(creep) {
    // Don't bother doing anything if it's still spawning
    if(creep.spawning) {
        return;
    }
    console.log("Bootstrapper called");
    console.log("creep name: "+creep.name);

    if (creep.room.name != creep.memory.roomName)
    {
        // move creep towards room
        creep.task = Tasks.goToRoom(creep.memory.roomName)
    } else {
        if (creep.store[RESOURCE_ENERGY] > 0 ) {
            //DELIVER ENERGY
            let structures = creep.room.find(FIND_MY_STRUCTURES , {filter: {structureType: STRUCTURE_SPAWN}});
            if (structures.length > 0 ) {
                let spawn = structures[0];
                if (spawn.store.getFreeCapacity(RESOURCE_ENERGY) > 0 ){
                    creep.task = Tasks.transfer(spawn);    
                } else {
                    creep.task = Tasks.upgrade(creep.room.controller);
                }
                
                return;
            } 
    
            
        }else {
            let source = creep.pos.findClosestByPath(FIND_SOURCES,{filter: function(s){return s.isSafe();}});
            if (source != null) {
                console.log("source found");
                console.log("source id" +source.id);
                creep.task = Tasks.harvest(source);
            }
    
                
            
        }
    }
    

    

}

module.exports = Bootstrapper;