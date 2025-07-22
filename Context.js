// Constants
let Constants = {
    "PROCESS_ERRORED": -1, //Process experienced a fatal error do not run 
    "PROCESS_ENDED": 1, //Process believes itself completed do not run
    "PROCESS_RUNNING": 0, //Process is incomplete run again if there is CPU
    "NULL": null

};
// Game Context Object 
// used to pass the screeps Game object and other utilities
class Context {
    constructor (Game, Memory, PathFinder) {
        this.Game = Game;
        this.Memory = Memory;
        this.PathFinder = PathFinder;
        this.Constants = Constants;
    }
}

module.exports = Context;
