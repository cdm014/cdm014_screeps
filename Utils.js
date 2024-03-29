var CreepRequests = require('CreepRequest');
var RequestStatus = require('CreepRequestStatus');
var CreepRole = require('CreepRole');

// #region Source
// returns boolean on whether there's a hostile creep in range 5
Source.prototype.isSafe = function() {
    return this.isSafe(5);
};
Source.prototype.isSafe = function (dist) {
    if (this.pos.findInRange(FIND_HOSTILE_CREEPS, dist).length > 0) {
        return false;
    } else {
        return true;
    }
}

Source.prototype.getOpenSpaces = function() {
//*
  if (!this._safeSpaces) {
    this._safeSpaces = 0;
    var t = this.room.getTerrain();
    var c = 0;
    var p = this.pos;
    var x1 = p.x -1;
    var x2 = p.x +1;
    var y1 = p.y -1;
    var y2 = p.y +1;
    for (var y = y1; y <= y2; y++) {
      for (var x = x1; x <= x2; x++) {
        if (t.get(x,y) != 1) {
          this._safeSpaces++;
        }
      }
    }
  }
 // */
  return this._safeSpaces;
};


Source.prototype.ScoreRoomObject = function (targetObject) {
  return this.ScoreRoomPos(targetObject.pos);
}

Source.prototype.ScoreRoomPos = function (targetPos) {
  let score = 0;
  if (this.pos.roomName != targetPos.roomName) { //if not in this room add modifier based on distance in rooms
    score += (Game.map.getRoomLinearDistance(this.pos.roomName, targetPos.roomName) * Memory.config.roomBalance);

  }
  score += (this.targetedBy.length / this.getOpenSpaces());
}
// #endregion

Creep.prototype.countParts = function(partType) {
  let count = 0;
  for (let x in this.body) {
    let part = this.body[x];
    if (part.type == partType) {
      count++;
    }
  }
  return count;
}

// #region Spawn
StructureSpawn.prototype.SpawnRequest = function(v_request) { 
  ///<Summary>
  ///Accepts a CreepRequest Object and attempts to spawn it if this spawn is available
  ///</Summary>
  ///<param name="v_request">An object containing a Body, Name, and Options property</param>
  if(this.isSpawning() != false) {
    return ERR_BUSY;
  }
  var spawnResult = this.spawnCreep(v_request.Body, v_request.Name, v_request.Options);
  if (spawnResult == OK) {
    this._isSpawning = true;
  }
  return spawnResult;
}

StructureSpawn.prototype.SpawnBootstrapper = function ( roomName) {
  ///<Summary>
  ///Accepts a room name and uses that to create a CreepRequest
  ///for a creep that has the roll of bootstrapper and is 
  ///assigned to that room.
  ///Then passes the request immediately to StructureSpawn.SpawnRequest
  ///</Summary>
  ///<param name="roomName">Name of the room the bootstrapper will be assigned to</param>
  console.log("_SpawnBootstrapper called");
  var v_request = CreepRequests.NewRequest([WORK,CARRY,MOVE,MOVE], "Bootstrapper-"+Game.time,{
    memory: {role: CreepRole.BOOTSTRAPPER, "roomName": roomName}
});
  console.log("spawning result: "+ this.SpawnRequest(v_request))

}

StructureSpawn.prototype.isSpawning = function() {
  if (this._isSpawning == undefined) {
    this._isSpawning = false;
  }
  if (this.spawning == null) {
    return this._isSpawning;
  } else {
    return true;
  }
}
// #endregion

// #region Controller
StructureController.prototype.ticksToDowngradeTotal = [0,20000,10000,20000,40000,80000,120000,150000,200000];
StructureController.prototype.ticksToDowngradePercent = function() {return this.ticksToDowngrade / this.ticksToDowngradeTotal[this.level];};
StructureController.prototype.ControllerScore = function() {
  var score = 5;
  var percent = this.ticksToDowngradePercent()*100;
  if (percent <= 3.125) {
    score = 1;
  } else if (percent <= 6.25) {
    score = 2;
  } else if (percent <= 12.5) {
    score = 3;
  } else if (percent <= 25) {
    score = 4;
  }
  return score;

}
// #endregion

// #region Room
Room.prototype.DistanceTo = function (rname,continuous = false) {
  if (this.name == rname) {
    return 0;
  } else {
    return Game.map.getRoomLinearDistance(this.name,rname, continuous);

  }
}

Room.prototype.ControllerScore = function () {
  return this.controller.ControllerScore();
}
//returns average health of structures
Room.prototype.RepairScore = function() {
  if (Memory.rooms[this.name].structures == null) {
    return -1;
  } else {
    let TotalScore = 0;
    let count = 0;
    for (var x in Memory.rooms[this.name].structures) {
      let structureCount = Memory.rooms[this.name].structures[x].length;
      count += structureCount;
      TotalScore += (structureCount * x);
    }
    return TotalScore/count;
  }
}
Room.prototype.BuildingWeights = {
  STRUCTURE_CONTAINER: 1,
  STRUCTURE_STORAGE: 1,
  STRUCTURE_EXTENSION: 1,
  STRUCTURE_SPAWN: 1,
  STRUCTURE_TOWER: 1,
}

Room.prototype.Buildingcounts = {
  STRUCTURE_CONTAINER: [0,1,1,1,0,0,0,0,0],
  STRUCTURE_STORAGE:   [0,0,0,0,1,1,1,1,1],
  STRUCTURE_EXTENSION: [0,0,5,10,20,30,40,50,60],
  STRUCTURE_SPAWN:     [0,1,1,1,1,1,1,2,3],
  STRUCTURE_TOWER:     [0,0,0,1,1,2,2,3,6]
}

Room.prototype.BuildingTypesToCheck = [
  STRUCTURE_CONTAINER,
  STRUCTURE_STORAGE,
  STRUCTURE_EXTENSION,
  STRUCTURE_SPAWN,
  STRUCTURE_TOWER
];

Room.prototype.Score = function(x,y) {
  let score = 5;
  if (x <= y / 16) {
    score = 1;
  } else if ( x <= y /8) {
    score = 2;
  } else if (x <= y / 4) {
    score = 3;
  } else if (x <= y / 2) {
    score = 4;
  }
  return score;
}

Room.prototype.BuildingScoreByType = function(FIND_STRUCTURE_TYPE) {
  let fullBuildings =  this.find(
    FIND_STRUCTURES, 
    {filter: {structureType: FIND_STRUCTURE_TYPE}}  
  );

  let buildingSites = this.find(
    FIND_CONSTRUCTION_SITES,
    {filter: {structureType: FIND_STRUCTURE_TYPE}}
  );
  let totalCount = fullBuildings.length = buildingSites.length;
  return this.Score(this.totalCount,this.Buildingcounts[FIND_STRUCTURE_TYPE])

}

Room.prototype.ScanRoomHealth = function () {
  let roomName = this.name;
  let room = this;
  var structures = room.find(FIND_STRUCTURES);
  
  if (Memory.rooms[roomName] == null ) {
    Memory.rooms[roomName] = {};
  }
  let roomMemory = Memory.rooms[roomName];
  // Prioritize structures by their health score
  //#region Structures
  if ( roomMemory.structures == undefined || roomMemory.structures.includes(", ") ){
    roomMemory.structures = []
  }

 
  for (var index in structures) {
    let structure = structures[index];
    let healthScore = structure.HealthScore();
    if (roomMemory.structures[healthScore] == undefined) {
      roomMemory.structures[healthScore] = [];
    }
    let healthSet = roomMemory.structures[healthScore];
    if (!_.contains(healthSet,structure.id)) {
      healthSet.push(structure.id);
    }

    if (roomMemory.ConstructionSites == undefined) {
      roomMemory.ConstructionSites = [];
    }

    let ConstructionSitesList = this.find(FIND_CONSTRUCTION_SITES);
    for (var siteIndex in ConstructionSitesList) {
      let site = ConstructionSitesList[siteIndex];
      if (site.ProgressScore != -1) {
        let score = site.ProgressScore();
        if (roomMemory.ConstructionSites[score] == undefined) {
          roomMemory.ConstructionSites[score] = [];
        }
        if (!_.contains(roomMemory.ConstructionSites[score],site.id)) {
          roomMemory.ConstructionSites[score].push(site.id);
        }
      }
    }
  }
  //#endregion

  //#region Resource Requests
  //set up room resource requests
  if (Memory.config.store != undefined) {
    console.log("Memory.config.Store: defined");
    if (roomMemory.Deposits == undefined) {
      roomMemory.Deposits = {};
    } else {
      console.log("roomMemory.Deposits configured")
    }
    let resourceTypes = _.keys (Memory.config.store);
    let structures = this.find(FIND_STRUCTURES,{filter: function(STRUCTURE) {
      let retval = false;
      if (STRUCTURE.structureType == STRUCTURE_SPAWN ||
        STRUCTURE.structureType == STRUCTURE_CONTAINER)
      {
        retval = true;
      }
      return retval;
    }});
    for (var index in resourceTypes) {
      let RESOURCE_TYPE = resourceTypes[index];
      if (roomMemory.Deposits[RESOURCE_TYPE] == undefined) {
        roomMemory.Deposits[RESOURCE_TYPE]=[]
      }
      let DepositList = roomMemory.Deposits[RESOURCE_TYPE];
      for (var index in structures){
        let structure = structures[index];
        let score = structure.ResourceScore(RESOURCE_TYPE);
        if (DepositList[score] == undefined) {
          DepositList[score] = [];
        }
        console.log ("Scoring object id: "+structure.id +" score: "+score)
        DepositList[score].push(structure.id);
      }

    }
    
  }
  //#endregion

  //#region Sources
  let sources = this.find(FIND_SOURCES_ACTIVE, {filter: function(source) {return source.isSafe();}});
  //report safe sources
  for (var index in sources) {
    let source = sources[index];
    if (!_.contains(Game.Sources,source)) {
      Game.Sources.push(source)
    }
  }
  //#endregion
 
  console.log( "Controller score: "+this.ControllerScore());
  //#region  Controllers
  if(Game.Controllers[this.ControllerScore()] == null ) {
    console.log("score not found creating list");
    Game.Controllers[this.ControllerScore() ]=[];
  }
  Game.Controllers[this.ControllerScore()].push(this.controller)
  //#endregion 
}
// #endregion

// #region ConstructionSite
ConstructionSite.prototype.Score = function(x,y) {
  let score = 5;
  if (x <= y / 16) {
    score = 1;
  } else if ( x <= y /8) {
    score = 2;
  } else if (x <= y / 4) {
    score = 3;
  } else if (x <= y / 2) {
    score = 4;
  }
  return score;
}

ConstructionSite.prototype.ProgressScore = function () {
  if (this.my == true) {
    //console.log("Current Progress: "+this.progress+" total progress: "+this.progressTotal+" score: "+this.Score(this.progress,this.progressTotal ));
    return this.Score(this.progress, this.progressTotal);
  } else {
    return -1;
  }
}
// #endregion

// #region Structure
Structure.prototype.HealthScore = function() {
  var score = 5;
  if (this.hits <= 10 || this.hits <= (this.hitsMax/16)) {
    score = 1; //do something about this ASAP
  } else if (this.hits <= (this.hitsMax/8)) {
    score = 2;
  } else if (this.hits <= (this.hitsMax/4) ) {
    score = 3;
  } else if (this.hits <= (this.hitsMax / 2)) {
    score = 4;
  }

  if (this.my != null && this.my == false) {score = -1}
  return score;
}

Structure.prototype.ResourceScore = function (RESOURCE_TYPE) {
  let keys = _.keys(Memory.config.store) ;
  if (this.structureType == STRUCTURE_STORAGE ||
    this.structureType == STRUCTURE_CONTAINER) 
  {
    if (this.store == undefined || !_.contain(keys,RESOURCE_TYPE)) {
      return -1;
    } else {
      let modifier = Memory.config.store[RESOURCE_TYPE] / 100;
      let maxCap = this.store.getCapacity(RESOURCE_TYPE) * modifier;
      let stored = this.store.getUsedCapacity(RESOURCE_TYPE);
      return this.Score(stored,maxCap);
    }
  }else {
    return -1;
  }
}

Structure.prototype.Score = function(x,y) {
  let score = 5;
  if (x <= y / 16) {
    score = 1;
  } else if ( x <= y /8) {
    score = 2;
  } else if (x <= y / 4) {
    score = 3;
  } else if (x <= y / 2) {
    score = 4;
  }
  return score;
}


// #endregion