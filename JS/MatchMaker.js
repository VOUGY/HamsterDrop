var i;

function setListPlayers() {
    var p1 = new PlayerNico(1,"p1",1);
    var p2 = new PlayerNico(2,"p2",2);
    var p3 = new PlayerNico(3,"p3",3);
    var p4 = new PlayerNico(4,"p4",4);

    var listPlayers = [p1,p2,p3,p4];

    return listPlayers;
}

function getWinners() {

    var newListPlayers = new PlayerNico;
    var oldListPlayers = new PlayerNico(JSON.parse(sessionStorage.getItem("listPlayers")));

    for(i = 0; i<oldListPlayers.length;i++)
    {
        if(oldListPlayers[i].getLose() == 0)
            newListPlayers[i] = oldListPlayers[i];
    }

    sessionStorage.setItem("listPlayers", JSON.stringify(newListPlayers));

}

function createMatches(listPlayers){

    var y = 0;
    var listMatch = [];
    for(i = 0; i<listPlayers.length/2; i++)
    {
        listMatch[i] = new Match(listPlayers[y], listPlayers[y+1]);
        y = y + 2;
    }

    return listMatch;
}