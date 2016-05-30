var LolApi = require('leagueapi');
async = require("async");

LolApi.init('764e1cc7-f55d-4d21-8d6e-48c343392844', 'na');
var dict = {};
var kdas = [];
var names = {};

LolApi.Stats.getRanked("22359069",'na', function(err, ranked)
{
    
    console.log(":::::::::::RANKED::::::::::");
	var rankedJSON = JSON.parse(JSON.stringify(ranked)); // parse JSON object
    for(i = 0; i < rankedJSON.length; i++) 
    { 
        var current = rankedJSON[i];
        if(current.id != 0) // look for champion id's that aren't 0
        {
            var kda = ((current.stats.totalChampionKills+current.stats.totalAssists)/current.stats.totalDeathsPerSession).toFixed(2); // calculate kill+assist/death ratio
            kdas[i] = kda; // store kda's into array
            dict[kda] = current; // store data of champion into a dictionary 
        }
    }
    kdas.sort().reverse();
    console.log(kdas);
    if(kdas.length > 5)
    {
        for(i = 0; i < 5; i++)
        {
            console.log(dict[kdas[i]].id);
            getChampID(dict[kdas[i]].id);
        }
    }

        
});

function getChampID(id)
{
    var name;
    LolApi.Static.getChampionById(id, 'na', function(err, champs)
    {
        var champName = JSON.parse(JSON.stringify(champs));
        name = champName.name;
        names[id] = name;
        console.log(name);
    });
    return name;
};
//LolApi.getMatchHistory("22359069", 'RANKED_SOLO_5X5, SEASON2016','na', function(err, history)
//{tl2011a  
//    var temp = [];
//    console.log(":::::::::::MATCH HISTORY::::::::::");
//    var lolJSON = (JSON.stringify(history));
//    //console.log(lolJSON);
//    console.log(history);
    
//    var lolJSON = JSON.parse(history);
//    lolJSON.split(/{} ,/);
//    for(x = 0; x<lolJSON.length; x++)
//    {
//        if(lolJSON[x].localeCompare("id"))
//            console.log(x);
//    }
//         6              });
