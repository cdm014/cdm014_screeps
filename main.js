let Tasks = require('creep-tasks');
let Bootstrapper = require('roleBootstrapper');
var Traveler = require('Traveler');
let Role = require('CreepRole');
let _ProcessTable = require('ProcessTable');
let Process = require('ProcessEntry');
var ProcessRunner = require('ProcessRunner');
const ProcessStatus = require('ProcessStatus');
const ProcessNames = require('ProcessNames');
require('Utils');
var Empire = require('Empire');
//var CreepRequest = require('CreepRequest');


module.exports.loop = function () {
  /**
   * PERMANENT PROCESSES
   * 0 - INIT: MEMORY CONFIG AND BASE JOB SCHEDULER
   * 1 - BOOTSTRAP: STARTER CREEP
   * 
   */
  let spawn = Game.spawns['Spawn1'];
  
  var ProcessTable = new _ProcessTable();
  let runner = new ProcessRunner();
  //SET UP OUR MAIN PROCESSES
  let INIT = new Process(0,0,ProcessStatus.RUNNING, null, ProcessNames.INIT)
  let BOOTSTRAP = new Process(1, 0,ProcessStatus.RUNNING, null, ProcessNames.BOOTSTRAP)
  ProcessTable.addProcess(INIT);
  ProcessTable.addProcess(BOOTSTRAP); 
/*
  var v_Empire = new  Empire();
  console.log("Next Process ID: "+ProcessTable.getNextId())
  let criticals = ProcessTable.getProcessesByPriority(0);
  criticals.forEach(element => {
    console.log("Logging "+element.Id);
    element.log();
    
  });
  
 v_Empire.Init();
 v_Empire.Bootstrap();
 */

 // SCAN ROOMS FOR HEALTH. WILL LATER MAKE THIS IT'S OWN PROCESS
 // CANNOT RUN THIS BEFORE INIT CODE RUNS
 /*
 for (var roomName in Game.rooms) {
   let room = Game.rooms[roomName];
   room.ScanRoomHealth();
  //console.log(roomName+" - "+STRUCTURE_SPAWN+" : "+room.BuildingScoreByType(STRUCTURE_SPAWN));
 }
 */

 //loop through priorities running processes
 for (let i = 0; i <= 5; i++) {
  let processes = ProcessTable.getProcessesByPriority(i);
  processes.forEach(element => {
    runner.Run(element);
  });

 }


/*
 // RUN BOOTSTRAP CREEPS, WILL LATER START MOVING THIS INTO THE BOOTSTRAP THREAD
 for (var cname in Game.creeps) {
   let creep = Game.creeps[cname];
   console.log("Creep Name: "+cname);
   //set tasks for bootstrappers
   if (creep.memory.role == Role.BOOTSTRAPPER) {
     console.log( cname + " is bootstrapper");
     if (creep.isIdle) {
       console.log("setting bootstrapper task");
       Bootstrapper(creep);
     }
   }
   creep.run();
 }

*/


  
};
