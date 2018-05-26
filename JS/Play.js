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
        this.score = [];
        this.active = true;

        console.log("A new player " + this.name)
    }

    addscore(level,value, time) {
        this.score[level].value = 0;
        this.score[level].time = 0;
    }
    score()
    {
        return this.score.time;
    }
}

class Tournament
{
    constructor(aPlayers)
    {
        this.aPlayers = aPlayers;
        this.winquarterfinal = [];
        this.winsemifinal = [];
        this.winfinal [];
    }
    fillQuarterFinal(orderPlayers)
    {
        this.fillQuarterFinal
    }
    winTournament()
    {
        
    }

}
class Match
{
    constructor(player1,player2)
    {
        this.player1 = Player (player1);
        this.player2 = Player (player2);
    }
    win()
    {
            if(this.player1.score() > this.player2.score())
            {
                return this.player1;
            } else
            {
                return this.player2;
            }
    }
}
