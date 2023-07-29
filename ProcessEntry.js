


class ProcessEntry {
    //class to hold process records
    Id;
    priority;
    status;
    parentId;
    processName;
    constructor(pID, pri, stat, parentId, pName) {
       this.name = "ProcessEntry";
       this.Id = pID;
       this.priority = pri;
       this.status = stat,
       this.parentId = parentId
       this.processName = pName;

    }

}

module.exports = ProcessEntry