# Screeps_OS
 an attempt to do an OS model screeps system

## OS
- members
    - Config -- configuration values. Stored in Memory
    - ProcessTable -- list of executable processes. Stored in Memory
    - ProcessMemory -- Memory for each running process to use. Stored in Memory. Plan is to let OS handle gatekeeping memory access. 
- methods
    - INIT() -- called each tick to ensure the necessary setup gets done and sets up the initial processes to run for the tick.
    - RUN() -- called each tick to run the processes in the process table, until no more processes to run or we're too close to the end of the tick
    - LOG(LOGLEVEL, MSG) -- sends a message to the console, use the loglevel for filtering which messages get logged. eventually plan to have this also send certain messages via email. 
    - KillProcess(process info) 
        - changes the status on the process table to KILLED
        - removes resource requests
        - removes creep requests

## ProcessTable
- members
    - processes -- table of all processes to be run
- methods
    - scheduler -- returns the next 5 processes to be run by priority
    - checkIdExists -- checks if a passed in ID has an entry on the table
    - getNextId -- returns the next available ID that can be assigned to a process
    - addProcess -- adds a new process to the table
    - getProcess -- returns an entry from the process table corresponding to the id passed in
    - KillProcess -- marks an entry in the process table as killed making that number
    available for assignment again and ensuring it doesn't get scheduled
    - getProcessesByName -- returns the list of processes with the name passed in
    used to check if certain processes are already in the table

## Processes
- each process is expected to have a Run function which takes the ProcessTable entry and the OS object
    - the run function should execute the minimum amount of code per run and rely on being run multiple times to achieve it's goal (i.e. if it controls multiple creeps, each run should handle a single creep)

## Creep Types
    * worker - [carry, work, 2 x move]
    * hauler - [carry, move]
    * claimer - [claim, move]
    * attacker - [tough, attack, move]
    * ranged - [tough, ranged_attack,move]
    * healer - [heal, move]

## basic room procedure
    * bootstrap if needed
    * start harvest processes 
    * start upgrade process
## Current and Planned Process list
|ProcessName|Description|Done or Planning|
|---|---|---|
|TEST|logs process information|done
|BOOTSTRAP| start a single creep which keeps a local spawn filled|done
|SCAN|updates status of rooms|done
|CLEARMEMORY|removes memory for dead creeps and rooms | planning
|RESOURCESCHEDULE| assigns creeps to requests | planning



## Resource Requests
### Overview
processes will request resources from the OS. The OS will fulfill these resources by filling a creep with the requested resource, then assigning that resource to the requesting process.
### request format
|property|description|
|---|---|
|ProcessId|Id of the process on the process table requesting the resource|
|ResourceType|constant of RESOURCE_* indicating the type of resource requested one type to a request|
|RequestAmount| amount of resource requested
|roomName| room where the resource is needed
|CreepsAssigned| should only be filled/edited by OS for tracking creeps assigned to a request|

### OS request related functions
|name|description|
|---|---|
|AddRequest| adds a new request or updates a request if that id and resource type are already on the list|
|RemoveRequest| removes requests from the request table|
|GetProcessRequests| get's the requests for a specific process ID

### RESOURCESCHEDULE PROCESS
1. Check whether there are enough resource creeps
    - spawn more if not
2. order requests by process priority order
3. exclude requests which have enough fulfillment
4. loop through requests assigning closest available creeps with the right resource
5. after all assigned, loop through remaining requests assigning empty creeps to gather the needed resource if available

## Spawning Management
### Overview
Processes needing creeps will request access to a spawn from the OS. The OS will fulfill these spawn requests by assigning an available spawn
### spawn request 
|field|description|
|---|---
|creepName| name to give the spawned creep. Also used as unique key for request
|ProcessId| ID of the process requesting a spawn assigned
|processPriority| priority of the process 
|roomName| room where the spawn is needed (used to assign closest available spawn)
|Body|body array requested|
|SpawnsAssigned| should only be edited by AI gives the name of the spawn assigned to this request|
|Status| Pending (request is in queue waiting to be assigned), Assigned (a spawn has accepted the request), Cancelled (OS will not be fulfilling this request. Likely no spawn in range capable)
|ExpiresOn| set when the OS assigns a spawn or cancels the request. On this tick the request will be deleted.

### OS Spawn Managment Functions
|function|Description|
|---|---|
|AddRequest|Adds a request for a creep
|GetProcessRequests|gets the requests for a specific processID
|DeleteRequest | removes the request using the creep name as the id|

### Spawn Scheduling Process
1. select requests which are pending
2. order them in priority order
3. while we have pending requests and spawns not spawning
    1. if we have available spawn in range try spawning request
    1. otherwise mark cancelled
    1. move to next request

## Roadmap
    * OS will manage resource requests
        - requests will be for a creep with the resource 
        - request format (ProcessInformation, resource_type, roomName)
        - request processing
            - are there unassigned creeps with that resource in the room
                - yes then assign to process
                - no assign creep to get that resource
