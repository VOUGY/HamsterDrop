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

