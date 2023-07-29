let ProcessNames = require('ProcessNames');
let ProcessStatus = require('ProcessStatus');
class ProcessInit {
    constructor() {
        this.Name = "process-INIT";
    }
    Run(pId) {
        console.log("Called "+this.Name+".Run with process id : "+pId);
        /*
        let rooms = _.keys(Game.rooms);
        let screeps = _.keys(Game.creeps);
        if (rooms.length == 1 && screeps.length == 0) {
            let spawns = _.keys(Game.spawns);
            let spawnName = spawns[0];
            let spawn = Game.spawns[spawnName];
            console.log ("bootstrapper: "+spawn.SpawnBootstrapper(spawn.room.name)); 
        }
        */
    }

}
module.exports = ProcessInit