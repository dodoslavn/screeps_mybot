var leaderOpravar = 
    {
    run: function() 
        {
        for (var name in Game.creeps)
            {
            var creep = Game.creeps[name];
            if (creep.memory['leader'] == "Opravar")
                {
                if ((creep.carry.energy == creep.carryCapacity) & (creep.memory['cinnost'] == "tazim")) creep.memory['cinnost'] = "";
                if (creep.carry.energy == 0) creep.memory['cinnost'] = "tazim";
                
                if (creep.carry.energy < creep.carryCapacity & creep.memory['cinnost'] == "tazim" ) 
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
                    var targets = creep.room.find(FIND_STRUCTURES, { filter: (structure) => { return structure.hits < structure.hitsMax; } });
                    targets.sort((a,b) => a.hits - b.hits);
                    if(targets.length > 0) 
                        {
                        if (creep.memory['cinnost'] != "opravujem" )
                            {
                            creep.memory['cinnost'] = "opravujem";
                            creep.memory['stavba'] = "";
                            }
                        
                        if ((creep.memory['stavba'] == undefined) || (Game.getObjectById(creep.memory['stavba']) == null) || (Game.getObjectById(creep.memory['stavba']).hits == Game.getObjectById(creep.memory['stavba']).hitsMax) )
                            {
                            creep.memory['stavba'] = targets[0].id;
                            console.log(creep.name+" Nastavujem na stavbu ");
                            }
                            
                        if (creep.repair(Game.getObjectById(creep.memory['stavba'])) == ERR_NOT_IN_RANGE) 
                            creep.moveTo(Game.getObjectById(creep.memory['stavba']), {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    else 
                        {
                        console.log(creep.name+" neni co opravovat");
                        }
                    }
                }
            }
        }
    };

module.exports = leaderOpravar;

