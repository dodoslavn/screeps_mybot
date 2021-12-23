var housekeepingCreep = 
    {
    run: function() 
        {
        if (Game.spawns.Spawn1.energyCapacity == Game.spawns.Spawn1.energy)
            {
            if (Memory.pocet.banik < Memory.maximum.banik)
                { 
                var creep_name = 'Creep_Banik_#'+Memory.pocet.banik;
                
                console.log('Spawning '+creep_name); 
                Game.spawns.Spawn1.spawnCreep([WORK,MOVE,CARRY],creep_name,{memory: {leader:'Banik', creep_id: Memory.pocet.banik} });
                
                Memory.pocet.banik++;
                }
            else if (Memory.pocet.doplnovac < Memory.maximum.doplnovac)
                { 
                var creep_name = 'Creep_Doplnovac_#'+Memory.pocet.doplnovac;
                
                console.log('Spawning '+creep_name); 
                Game.spawns.Spawn1.spawnCreep([WORK,MOVE,CARRY],creep_name,{memory: {leader:'Doplnovac', creep_id: Memory.pocet.doplnovac} });
                Memory.pocet.doplnovac++;
                }
            else if (Memory.pocet.opravar < Memory.maximum.opravar)
                { 
                var creep_name = 'Creep_Opravar#'+Memory.pocet.opravar;
                
                console.log('Spawning '+creep_name); 
                Game.spawns.Spawn1.spawnCreep([MOVE,MOVE,MOVE,WORK,WORK,CARRY,CARRY],creep_name,{memory: {leader:'Opravar', creep_id: Memory.pocet.opravar} });
                Memory.pocet.opravar++;
                }
            else if (Memory.pocet.murar < Memory.maximum.murar)
                { 
                var creep_name = 'Creep_Murar_#'+Memory.pocet.murar;
                
                console.log('Spawning '+creep_name); 
                Game.spawns.Spawn1.spawnCreep([WORK,MOVE,CARRY],creep_name,{memory: {leader:'Murar', creep_id: Memory.pocet.murar} });
                Memory.pocet.murar++;
                }
            else
                { 
                //console.log('Spawn - vsetkych kreepov je dostatok');  
                }
            }
        for (var name in Game.creeps)
            {
            var creep = Game.creeps[name];
            if (creep.ticksToLive < 100)
                Game.spawns.Spawn1.renewCreep(creep);
            }
        
        var pocet = [];
        pocet['Murar'] = 0;
        pocet['Banik'] = 0;
        pocet['Doplnovac'] = 0;
        
        var pocetm = 0;
        
        for (var name in Memory.creeps)
            {
            if (Game.creeps[name])
                {
                if (Game.creeps[name].memory['leader'] == "Banik") pocet['Banik']++;
                if (Game.creeps[name].memory['leader'] == "Murar") pocet['Murar']++;
                if (Game.creeps[name].memory['leader'] == "Doplnovac") pocet['Doplnovac']++;
                }
            else
                { pocetm++; }
            }
        if (pocetm > 0) console.log("Pocet mrtvych: "+pocetm);
            
        for (var name in Memory.creeps)
            {
            if (!Game.creeps[name])
                {
                if (pocet['Banik'] < 4)
                    Game.spawns.Spawn1.spawnCreep([WORK,WORK,CARRY,MOVE],name);
                else if ( Memory.creeps[name]['leader'] == 'Doplnovac' )
                    { Game.spawns.Spawn1.spawnCreep([WORK,CARRY,MOVE],name); }
                else if ( Memory.creeps[name]['leader'] == 'Opravar' )
                    { Game.spawns.Spawn1.spawnCreep([WORK,CARRY,MOVE],name); }
                else
                    {
                    if ( Game.spawns.Spawn1.spawnCreep([MOVE,WORK,WORK,CARRY,CARRY,MOVE],name) == 0 )
                        console.log("Spawn - Vytvaram silneho");
                    }
                }
            }
        }
    };

module.exports = housekeepingCreep;