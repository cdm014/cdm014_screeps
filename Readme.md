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
# Notes and Concepts
* should have elements of self organizing
* creeps belong to the game system as a whole
* fractalled design for scaling

* i start off with one room and one spawn with full energy
* evaluate needs of room 
    * how close is the controller to downgrading
    * does it have container/storage
    * health scoring for structures
        * sev 1 = Hits < 10 || hits < (totalHits/2^2)
        * sev 2 = Hits < (totalHits/2^2)
        * sev 3 = hits < (totalHits / 2 ^1)
        * sev 4 = hits < (totalHits / 2^0)
    * does it need more of a type of building
        * room.BuildingScoreByType(STRUCTURE_TYPE CONSTANT) - checks both structures and building sites
        
    

