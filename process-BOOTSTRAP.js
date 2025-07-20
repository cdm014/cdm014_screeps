let ProcessNames = require('ProcessNames');
let ProcessStatus = require('ProcessStatus');
class ProcessBootstrap {
    constructor() {
        this.Name = "process-Bootstrap";
    }
    Run(pId) {
        console.log("Called "+this.Name+".Run with process id : "+pId);
        // CHECK IF WE NEED TO CREATE A BOOTSTRAPPER
        let rooms = _.keys(Game.rooms);
        let screeps = _.keys(Game.creeps);
        if (rooms.length === 1 && screeps.length === 0) {
            let spawns = _.keys(Game.spawns);
            let spawnName = spawns[0];
            let spawn = Game.spawns[spawnName];
            // spawn one bootstrapper for the room
            console.log("bootstrapper: " + spawn.SpawnBootstrapper(spawn.room.name));
        }
        // RUN BOOTSTRAP CREEPS
        let Role = require('CreepRole');
        let Bootstrapper = require('roleBootstrapper');
        for (let cname in Game.creeps) {
            let creep = Game.creeps[cname];
            if (creep.memory.role === Role.BOOTSTRAPPER) {
                if (creep.isIdle) {
                    Bootstrapper(creep);
                }
                creep.run();
            }
        }
    }

}
module.exports = ProcessBootstrap
