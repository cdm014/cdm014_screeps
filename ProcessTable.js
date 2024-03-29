let ProcessStatus = require('ProcessStatus');
class ProcessTable {
    constructor() {
        if (Memory.ProcessTable == undefined) {
            Memory.ProcessTable = {};
        }
        if (Memory.ProcessTable.processes == undefined) {
            Memory.ProcessTable.processes = {};
        }
        this.processes = Memory.ProcessTable.processes;
        if (Memory.ProcessTable.LastFix == undefined) {
            Memory.ProcessTable.LastFix = Game.time;
        }
        this.LastFix = Memory.ProcessTable.LastFix;
        this.ids = this._getNextId();
    }

    * _getNextId() {
        ///<Summary>
        ///goes through id's finding the next id that's available
        ///</Summary>
        let id = 0;
        while(true) {
            if (!this.checkIdExists(id) ) {
                yield id;
            }
            id++;
        }
    }

    checkIdExists(v_id) {
        ///<Summary>
        ///checks if an id is in the table returns true if it's in the table and doesn't
        ///have a status of ProcessStatus.KILLED
        ///</Summary>
        console.log("Checking id: "+v_id);
        console.log("processes: "+_.keys(this.processes));
        if (this.processes[v_id] == undefined) {
            console.log("processes did not have "+v_id);
            return false;
        }
        if (this.processes[v_id] != undefined) {
            console.log("found process id");
            if (this.processes[v_id].status == ProcessStatus.KILLED) {
                console.log( "previous process is dead");
                return false;
            } else {
                console.log ("previous process not dead");
                return true;
            }
        }

        
    }

    getNextId() {
        let returnedId = this.ids.next();
        if (!returnedId.done) {
            return returnedId.value;
        } else {
            return null;
        }
    }
    addProcess(v_Process) {
        if (v_Process.Id == undefined  || 
            v_Process.processName == undefined) {
            console.log("not adding process because undefined");
            console.log("Process ID: "+v_Process.Id);
            console.log("Process Name: "+v_Process.processName);
            return null;
        }
        //if the process id doesn't already exist or this process is the same 
        if(!this.checkIdExists(v_Process.Id) || (this.checkIdExists(v_Process.Id) && v_Process.processName == this.getProcess(v_Process.Id).processName) ) {
            console.log("Adding Process id: "+v_Process.Id+" "+v_Process.processName)
            console.log("Process Status: "+v_Process.status);
            this.processes[v_Process.Id] = v_Process;
        } else {
            console.log("Not adding process id: "+v_Process.Id+" ".v_Process.processName+" because of existing process");
        }
    }
    getProcess(v_ID) {
        if (this.checkIdExists(v_ID)){
            return this.processes[v_ID];
        } else {
            return null;
        }
    }
    fixPriorities () {
        if (Game.time != this.LastFix){
            let ProcessesToFix = _.takeWhile(this.processes, function(p) {
                return (p.priority == undefined);
            });
            _.forEach(ProcessesToFix,function(p){
                p.priority = 5;
            });
        } 
    }
    getProcessesByPriority(priorityLevel) {
       let AllProcesses = _.values(this.processes);
       let processes = [];
       if (priorityLevel == 5) {
           this.fixPriorities();
       }
      
       processes = _.takeWhile(AllProcesses,{priority: priorityLevel, status: ProcessStatus.RUNNING});
       return processes;

    }
}

module.exports = ProcessTable;