
class Match {
    constructor(player1, player2) {
        this.player1 = Player(player1);
        this.player2 = Player(player2);
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
}