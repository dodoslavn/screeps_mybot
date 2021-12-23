var leaderMurar = 
    {
    run: function() 
        {
        for (var name in Game.creeps)
            {
            var creep = Game.creeps[name];
            if (creep.memory['leader'] == "Murar")
                {
                if(creep.carry.energy == creep.carryCapacity) creep.memory['cinnost'] = "stavam";
                if(creep.carry.energy == 0) creep.memory['cinnost'] = "tazim";
                    
                if(creep.memory['cinnost'] == "tazim") 
                    {
                    var sources = creep.room.find(FIND_SOURCES);
                    var zdroj_id = 0;
                    
                    if ( (creep.memory['creep_id'] % 2) == 1 ) zdroj_id = 1
                    else zdroj_id = 0;
                    if(creep.harvest(sources[zdroj_id]) == ERR_NOT_IN_RANGE) 
                        { creep.moveTo(sources[zdroj_id], {visualizePathStyle: {stroke: '#ff6666'}}); }
                    else
                        { creep.say(creep.carry.energy+' of '+creep.carryCapacity); }
                    }
                else 
                    {
                    if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) 
                        { creep.moveTo(creep.room.controller), {visualizePathStyle: {stroke: '#ff0000'}}; }
                    }
                }
            } 
        }
    };

module.exports = leaderMurar;