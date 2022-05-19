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
        let id = 0;
        while(true) {
            if (!this.checkIdExists(id)) {
                yield id;
            }
            id++;
        }
    }
    checkIdExists(v_id) {
        return (_.contains(_.keys(this.processes),v_id));
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
            return null;
        }
        if(!this.checkIdExists(v_Process.Id)) {
            this.processes[v_Process.id] = v_Process;
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
      
       processes = _.takeWhile(AllProcesses,{priority: priorityLevel});
       return processes;

    }
}

module.exports = ProcessTable;