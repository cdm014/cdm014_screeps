


class ProcessEntry {
    //class to hold process records
    ProcessMemoryId;
    priority;
    status;
    parentProcessMemoryId;
    processName;
    constructor(pID, pri, stat, parentId, pName) {
       this.name = "ProcessEntry";
       this.ProcessMemoryId = pID;
       this.priority = pri;
       this.status = stat,
       this.parentProcessMemoryId = parentId
       this.processName = pName;

    }

}

module.exports = ProcessEntry