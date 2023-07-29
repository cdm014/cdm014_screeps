let Process = require('ProcessEntry');
let ProcessName = require('ProcessName');
let ProcessStatus = require('ProcessStatus');

class ProcessRunner {
    constructor() {
        this.Name = "ProcessRunner"
    }
    Run(vProcess) {
        let runner = require(vProcess.processName)
        let p = new runner();
        p.Run(vProcess.Id);
    }



}
module.exports = ProcessRunner