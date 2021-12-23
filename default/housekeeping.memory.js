var housekeepingMemory = 
    {
    run: function() 
        {
        if (Memory.pocet === undefined) Memory.pocet = {};
        if (Memory.maximum === undefined) Memory.maximum = {};
        if (Memory.pocet.banik === undefined) Memory.pocet.banik = 0;
        if (Memory.pocet.murar === undefined) Memory.pocet.murar = 0;
        if (Memory.pocet.doplnovac === undefined) Memory.pocet.doplnovac = 0;
        if (Memory.pocet.opravar === undefined) Memory.pocet.opravar = 0;
        
        var pocet_zdrojov = Game.rooms[Game.rooms[Game.spawns.Spawn1.room.name].name].find(FIND_SOURCES).length;
        
        Memory.maximum.banik = pocet_zdrojov * 2 ;
        Memory.maximum.murar = pocet_zdrojov * 2 + 2;
        Memory.maximum.doplnovac = pocet_zdrojov;
        Memory.maximum.opravar = pocet_zdrojov;
        
        }
    };

module.exports = housekeepingMemory;