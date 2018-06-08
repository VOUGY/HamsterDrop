class PlayerNico
{
    constructor(id, name, idHamster)
    {
        this.id = id;
        this.name = name;
        this.idHamster = idHamster;
        this.lose = 0;
        this.score = 0;
    }

    getName()
    {
        return this.name;
    }

    fludl()
    {
        return "test";
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

    getID()
    {
        return this.id;
    }
}