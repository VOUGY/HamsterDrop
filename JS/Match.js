
class Match {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.end = false;
    }

    win() {
        if (this.player1.score() > this.player2.score()) {
            return this.player1;
        } else {
            return this.player2;
        }
        this.end = true;
    }

    getend()
    {
        return this.end;
    }

    getPOne()
    {
        return this.player1;
    }

    setPOne(player)
    {
        this.player1 = player;
    }

    setPTwo(player)
    {
        this.player2 = player;
    }

    getPTwo()
    {
        return this.player2;
    }
}