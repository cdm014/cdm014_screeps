//var utils = require('Utils');
var RequestStatus = require('CreepRequestStatus');
class CreepRequest {
    constructor(BodyArray,Name,Options) {
      this.Body = BodyArray;
      this.Name = Name;
      this.Options = Options ? Options : {};
      this.RequestStatus = RequestStatus.NONE;
    };
}

class CreepRequests {
    constructor() {
        this._unused = "";
    };
    static NewRequest (BodyArray, Name, Options) {
        return new CreepRequest(BodyArray,Name,Options);
    };
}



module.exports = CreepRequests;