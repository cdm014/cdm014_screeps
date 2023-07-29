let Process = require('ProcessEntry');
let ProcessName = require('ProcessNames');
let ProcessStatus = require('ProcessStatus');

class ProcessRunner {
    constructor() {
        this.Name = "ProcessRunner"
    }
    Run(vProcess) {
        console.log("ProcessRunner called for pId: "+vProcess.Id+" name: "+vProcess.processName);
        let runner = require(vProcess.processName)
        let p = new runner();
        p.Run(vProcess.Id);
    }



}
module.exports = ProcessRunner