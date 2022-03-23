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

1. store energy in containers/storage
2. upgrade controllers
3. use energy
    * give to spawns/extensions
    * give to towers
    * build construction sites
    * repair buildings

# rooms
    - what priority is storing energy
        * storage
        * containers
    - what priority is transferring energy (from storage or from sources) 
        * spawns
        * extensions
        * towers
    - what priority is using energy (from storage or from sources)
        * controllers
        * construction sites
        * repairing buildings



# creep types
- bootstrapper [work, carry, move, move]
    * purpose is to start the engine by giving the spawn a supply chain
    * also serve as cheap units to start a new room
    * always first creep created by engine
    * tied to particular room
    - picks from nearest source
    - deposits to 
        1. spawns
        2. claimers
        3. upgrades controller
- workers [work, carry, move, move ] (repeating sections, depending on spawn capacity)
    * general purpose worker
    * used for most jobs except room claiming reserving
- claimer [claim, up to 5 move sections]
    * used to claim neutral controllers 
    * used to attack enemy controllers
- reserver [claim claim (1 - 5 carry sections) ((2 + carry) * 3 move sections)]
    * used to reserve neutral controllers
- miners
    * like workers except used especially by mining manager

# next steps
1. create bootstrapper creeps
1. take requests from room and organize them
1. start making creeps of the right type to service requests
1. use created creeps to service requests
1. I want to use generators to serve out creeps and maybe loop through tasks


# long term planning
1. automatic construction sites
1. create attackers (assigned a room)

