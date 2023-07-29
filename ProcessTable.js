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
        if (_.contains(_.keys(this.processes),v_id)) {
            //check if the process has been killed
            if (this.getProcess(v_id).status == ProcessStatus.KILLED) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
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
            _.foreach(ProcessesToFix,function(p){
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