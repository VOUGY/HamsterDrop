class Play {
    constructor()
    {
        this.iTotalPlayer =0;
        this.iCurrentUser = 0;
        this.aPlayers = [];
        this.location = "";
    }
    reload(json)
    {
        this.iTotalPlayer=json.iTotalPlayer;
        json.aPlayers.forEach(function(element)
        {
           Game.reloadPlayer(element.playerId,element.name,element.idhamster,element.score)
        })
        //  this.aPlayers = json.aPlayers;
        this.location = json.location;
    }
    closeGame()
    {
        localStorage.removeItem("Game");
        location.href="VOUG_Prepa/GameBegin.html";
    }

    addPlayer(name, idHamster)
    {
        console.log("Création d'un nouveau joueur")

            var playertemp = new Player(this.iCurrentUser,name, idHamster,0);
            this.aPlayers[this.iCurrentUser] = playertemp;

            console.log("Le joueur " + (this.iCurrentUser + 1) + "/" + (this.iTotalPlayer) + "vient d'etre ajouter");
            console.log(this.aPlayers[this.iCurrentUser].name + "  " + idHamster)

            this.iCurrentUser++;

    }
    reloadPlayer(id,name, idHamster,score)
    {
        console.log("Création d'un nouveau joueur")

        var playertemp = new Player(id,name, idHamster,score);
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
        return this.aPlayers;
    }
    setaPlayers(aplayers)
    {
        this.aPlayers = aplayers;
    }


}
