let Process = require('ProcessEntry');
let ProcessNames = require('ProcessNames');
let ProcessStatus = require('ProcessStatus');

class ProcessRunner {
    constructor() {
        this.Name = "ProcessRunner"
    }
    Run(vProcess) {
        console.log("ProcessRunner called for pId: "+vProcess.Id+" name: "+vProcess.processName);
        let runner = null;
        switch (vProcess.processName) {
            case ProcessNames.TEST:
                runner = require('process-TEST');
                break;
        }
        let p = new runner();
        p.Run(vProcess.Id);
    }



}
module.exports = ProcessRunner