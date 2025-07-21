// Game Context Object 
// used to pass the screeps Game object and other utilities
class Context {
    constructor (Game, Memory, PathFinder) {
        this.Game = Game;
        this.Memory = Memory;
        this.PathFinder = PathFinder
    }
}

module.exports = Context;
