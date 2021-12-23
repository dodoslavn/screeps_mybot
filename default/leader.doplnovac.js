var leaderDoplnovac = 
    {
    run: function() 
        {
        for (var name in Game.creeps)
            {
            var creep = Game.creeps[name];
            if (creep.memory['leader'] == "Doplnovac")
                {
                if ((creep.carry.energy == creep.carryCapacity) & (creep.memory['cinnost'] == "tazim")) creep.memory['cinnost'] = "zvazam";
                else if(creep.carry.energy == 0) creep.memory['cinnost'] = "tazim";
                
                if(creep.carry.energy < creep.carryCapacity & creep.memory['cinnost'] == "tazim" ) 
                    {
                    var sources = creep.room.find(FIND_SOURCES);
                    if ( creep.memory['zdroj'] == undefined )
                        {
                        if ( (creep.memory['creep_id'] % 2) == 1 ) creep.memory['zdroj'] = sources[1].id
                        else creep.memory['zdroj'] = sources[0].id;
                        console.log(creep.name+' - Nasvtavujem zdroj na '+creep.memory['zdroj']);
                        }

                    if(creep.harvest(Game.getObjectById(creep.memory['zdroj'])) == ERR_NOT_IN_RANGE) 
                        { creep.moveTo(Game.getObjectById(creep.memory['zdroj']), {visualizePathStyle: {stroke: '#66ff66'}}); }
                    else 
                        { creep.say(creep.carry.energy+' of '+creep.carryCapacity); }
                    }
                else 
                    {
                    if (Game.spawns['Spawn1'].energy != Game.spawns['Spawn1'].energyCapacity)
                        {
                        creep.say(creep.carry.energy);
                        if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                            { creep.moveTo(Game.spawns['Spawn1'], {visualizePathStyle: {stroke: '#00ff00'}}); }
                        }
                    else
                        {
                        var targets = creep.room.find(FIND_STRUCTURES,  { filter: (structure) => { return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity; } });

                        if ( targets.length > 0 ) 
                            {
                            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) 
                                { creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#66ff66'}}); }
                            }
                        else
                            {
                            var targets = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return structure.hits < (structure.hitsMax / 2) ; } });
                            targets.sort((a,b) => a.hits - b.hits);
                            if(targets.length > 0) 
                                {
                                if (creep.memory['cinnost'] != "doplnam")
                                    {
                                    creep.memory['cinnost'] = "doplnam";
                                    creep.memory['stavba'] = "";
                                    }
                                
                                if (creep.memory['stavba'] == undefined || Game.getObjectById(creep.memory['stavba']) == null  || Game.getObjectById(creep.memory['stavba']).hits == Game.getObjectById(creep.memory['stavba']).hitsMax )
                                    {
                                    creep.memory['stavba'] = targets[0].id;
                                    console.log(creep.name+" Nastavujem na stavbu ");
                                    }
                                    
                                if (creep.repair(Game.getObjectById(creep.memory['stavba'])) == ERR_NOT_IN_RANGE) 
                                    creep.moveTo(Game.getObjectById(creep.memory['stavba']), {visualizePathStyle: {stroke: '#ffffff'}});
                                }
                            else
                                {
                                creep.moveTo(29,17+creep.memory['creep_id']);
                                console.log(creep.name+' - Spawn je plny, a aj tiez');
                                }
                            }
                        }
                    }
                }
            }
        }
    };

module.exports = leaderDoplnovac;

