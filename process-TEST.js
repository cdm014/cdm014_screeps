let ProcessNames = require('ProcessNames');
let ProcessStatus = require('ProcessStatus');
class ProcessTest {
    constructor() {
        this.Name = "process-TEST";
    }
    Run(pId) {
        console.log("Called "+this.Name+".Run with process id : "+pId);
    }

}
module.exports = ProcessTest