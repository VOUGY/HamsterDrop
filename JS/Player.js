class Player {
    constructor(playerid,name,idhamster,score)
    {
        this.playerId = playerid;
        this.name = name;
        this.idhamster = idhamster;
        this.score = score;
        this.active = true;

        console.log("A new player " + this.name);
    }
    setLose()
    {
        this.lose = 1;
    }

    getLose()
    {
        return this.lose;
    }

    setScore(score)
    {
        this.score = score;
    }

    getScore()
    {
        return this.score;
    }

}