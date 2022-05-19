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

|type   | name            |
|------ |---------------- |
|int    | processMemoryId |
|string | ProcessName     |
|int    | parent processID|
|array  | child processIDs|