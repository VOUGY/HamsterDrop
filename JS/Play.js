class Play
{
    constructor()
    {
        this.iTotalPlayer =0;
        this.iCurrentUser = 0;
        this.aPlayers = [];
        this.location = "";

    }
    addPlayer(name, idHamster)
    {
        console.log("Création d'un nouveau joueur")

            var playertemp = new Player(name, idHamster);
            this.aPlayers[this.iCurrentUser] = playertemp;

            console.log("Le joueur " + (this.iCurrentUser + 1) + "/" + (this.iTotalPlayer) + "vient d'etre ajouter");
            console.log(this.aPlayers[this.iCurrentUser].name + "  " + idHamster)

            this.iCurrentUser++;

    }
    setiTotalPlayer(totalPlayer)
    {
        this.iTotalPlayer = totalPlayer;
        console.log("La partie est créé avec " + (this.getiTotalPlayer()) + " joueurs" );
    }
    getiCurrentUser()
    {
        return this.iCurrentUser + 1;
    }
    getiTotalPlayer()
    {
        return this.iTotalPlayer;
    }
    setLocation(location)
    {
        this.location = location;
        console.log("Play in" + location);
    }
    getaPlayers()
    {
        return this.getaPlayers();
    }

}
class Player {
    /*var name;
    var idhamster;
    var value;
    var time;*/

    constructor(name,idhamster)
    {
        this.name = name;
        this.idhamster = idhamster;
        console.log("A new player " + this.name)
    }

    score() {
        this.value = 0;
        this.time = 0;
        this.add = function (addvalue, addtime) {
            this.value += addvalue;
            this.time += addtime;
        }
    }
}

