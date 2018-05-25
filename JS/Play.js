class Play
{
    constructor(iTotalPlayer)
    {
        this.iTotalPlayer = iTotalPlayer;
        this.iCurrentUser = 0;
        this.aPlayers = [];
        console.log("La partie est créé avec " + iTotalPlayer + " joueurs" );
    }
    AddPlayer(name, idHamster)
    {
        console.log("Création d'un nouveau joueur")

            var playertemp = new Player(name, idHamster);
            this.aPlayers[this.iCurrentUser] = playertemp;

            console.log("Le joueur " + this.iCurrentUser + "/" + this.iTotalPlayer + "vient d'etre ajouter");
            console.log(this.aPlayers[this.iCurrentUser].name + "  " + idHamster)

            this.iCurrentUser++;
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

