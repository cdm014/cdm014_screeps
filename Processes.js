class ProcessEntry {
    constructor(name, module, priority = 0) {
        this.name = name;
        this.module = module;
        this.priority = priority;
    }  
}

class Process {
    constructor(name) {
        this.name = name;
    }

    run() {
        // Placeholder for process logic
        console.log(`Running process: ${this.name}`);
    }
}

class IPCBus {
    constructor(Memory) {
        if (!Memory.IPCBus) {
            Memory.IPCBus = {};
        }
        this.memory = Memory.IPCBus;
    }
    RegisterQueue(name) {
        if (!this.memory[name]) {
            this.memory[name] = [];
        }
    }

    // Add a message to a queue
    Write(QueueName, message) {
        if (this.memory[QueueName]) {
            this.memory[QueueName].push(message);
            return this.memory[QueueName].length - 1; // Return the index of the message
        } else {
            console.error(`Queue ${QueueName} does not exist.`);
            return -1; // Indicate failure
        }
    }

    // pop the first message from a queue and return it
    Read(QueueName) {
       if (this.memory[QueueName]) {
            if (this.memory[QueueName].length > 0) {
                return this.memory[QueueName].shift(); // Remove and return the first message
            } else {
                console.error(`Queue ${QueueName} is empty.`);
                return null; // Indicate that the queue is empty
            }
        } else {
            console.error(`Queue ${QueueName} does not exist.`);
            return null; // Indicate failure
        }
    }
}

class Processes {

    constructor(Context) {
        this.Context = Context;
        if (!this.Context.Memory.Processes) {
            this.Context.Memory.Processes = [];
        }
        if (!this.Context.Memory.ProcessMemory) {
            this.Context.Memory.ProcessMemory = {};
        }

    }

    newEntry(name, module, priority = 0) {
        return new ProcessEntry(name, module, priority);
    }

    addProcess(entry, mem = {}) {
        if(! _.includes(this.memory.Processes, entry)) {
            this.Context.Memory.Processes.push(entry);
            this.Context.Memory.ProcessMemory[entry.name] = mem;
            return true;
        } else {
            console.log("Process: "+entry.name+" already exists");
            return false;
        }
    }
    
    runProcess(entry) {
        //load the memory
        let mem = this.Context.Memory.ProcessMemory(entry.name)
        let pname = "process"+entry.module;
        let process = require(pname);
        return process.run(this.Context, mem);
    }

    
    
 



    registerQueue(name) {
        this.IPCBus.RegisterQueue(name);
    }

    // Add a message to a queue
    Write(QueueName, message) {
        return this.IPCBus.Write(QueueName, message);
    }

    // pop the first message from a queue and return it
    Read(QueueName) {
        return this.IPCBus.Read(QueueName);
    }

    


    


    getIPCBus() {
        return this.IPCBus;
    }   

}

module.exports = Processes;