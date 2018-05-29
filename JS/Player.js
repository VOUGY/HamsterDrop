class Player {
    constructor(id,name,idhamster)
    {
        this.playerId = id;
        this.name = name;
        this.idhamster = idhamster;
        this.score = [];
        this.active = true;

        console.log("A new player " + this.name)
    }

    addscore(level,value, time) {
        this.score[level].value = value;
        this.score[level].time = time;
        console.log("score of player " + this.name + " :" + this.score[level].value + " during the level " + level)
    }
    score()
    {
        return this.score.time;
    }
}