# Project Goal
To have a codebase which can manage multiple rooms
## Criteria
* must be able to level initial room up to 6
    * must be able to harvest sources
    * must be able to use creeps carrying energy to upgrade the controller
    * must be able to deposit and withdraw energy from spawns, containers, storage
    * must be able to deposit energy into spawns, extensions, towers
    * must be able to build and repair structures
    * must build structures related to increased leveling
        * container
        * roads
        * extensions starting level 2
        * tower starting at level 3
        * storage starting at level 4
* must identify which neighboring rooms can be harvested and harvest from them if safe
    * room must not be owned or reserved
* must be able to mitigate attacks
    * must build and stock towers
    * should build and fortify walls and ramparts

# notes
- i'm going with an os/process based code base
## basic process table structure
|type   | name            |
|------ |---------------- |
|int    | processMemoryId   |
|int    | priority          |
|enum   | status - active, waiting on signal, finished|
|int    | parent processMemoryId|
|string | processName|

## basic process code structure
| type | name/signature | description|
|---|---|---|
|function | Run (processMemoryId) | runs the code for the process with the memory in that process memory slot It should check for signals sent within this function. This code should execute the smallest number of changes possible and may be called multiple times per tick if cpu permits|


## basic signal structure 
|type | name |
|---|---|
|int    | ID    |
|int    | priority |
|int    | senderId |
|int    | recipientId |
|json   | message   |




# Current Status
## Bootstrapping
Currently the only functionality is the Empire.Bootstrap function which will create a single 
Bootstrapper creep if the empire is only a single room and has no creeps. The bootstrapper creep
fills the first spawn in the room it is assigned to, then switches over to upgrading the controller.

# plans
## Processes
###
