var housekeepingCreep = require('housekeeping.creep');
var housekeepingMemory = require('housekeeping.memory');
var leaderBanik = require('leader.banik');
var leaderMurar = require('leader.murar');
var leaderDoplnovac = require('leader.doplnovac');
var leaderOpravar = require('leader.opravar');

module.exports.loop = function () 
    {
    housekeepingMemory.run();
    housekeepingCreep.run();
    leaderBanik.run();
    leaderMurar.run();  
    leaderDoplnovac.run();
    leaderOpravar.run();
    } 

    
/*

Game.rooms[Game.rooms[Game.spawns.Spawn1.room.name].name].createConstructionSite(10, 15, STRUCTURE_ROAD);
sdfsdf
*/