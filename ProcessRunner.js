let Process = require('ProcessEntry');
let ProcessNames = require('ProcessNames');
let ProcessStatus = require('ProcessStatus');

class ProcessRunner {
    constructor() {
        this.Name = "ProcessRunner"
    }
    Run(vProcess) {
        console.log("ProcessRunner called for pId: "+vProcess.Id+" name: "+vProcess.processName);
        let runner = require('process-TEST'); // USE DEFAULT PROCESS THAT JUST LOGS THE ID 
        switch (vProcess.processName) {
            case ProcessNames.TEST:
                runner = require('process-TEST');
                break;
            case ProcessNames.INIT:
                runner = require('process-INIT');
                break;
            case ProcessNames.BOOTSTRAP:
                runner = require('process-BOOTSTRAP');
                break;
        }
        let p = new runner();
        p.Run(vProcess.Id);
    }



}
module.exports = ProcessRunner