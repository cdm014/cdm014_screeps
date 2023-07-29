


class ProcessEntry {
    //class to hold process records
    Id;
    priority;
    status;
    parentId;
    processName;
    constructor(pID, pri, stat, parentId, pName) {
       console.log( "New Process Created");
       console.log("Name: "+pName);
       console.log("ID: "+pID);
       console.log("Priority: "+pri);
       console.log("Status: "+stat);
       console.log("Parent: "+parentId);
       this.name = "ProcessEntry";
       this.Id = pID;
       this.priority = pri;
       this.status = stat;
       this.parentId = parentId;
       this.processName = pName;
       this.log();
      

    }

    log() {
        console.log("Process Information");
        console.log("Name: "+this.processName)
        console.log("ID: "+this.Id);
        console.log("Priority: "+this.priority);
        console.log("Status: "+this.status);
        console.log("ParentId: "+this.parentId);
    }

}

module.exports = ProcessEntry