
var aPlayers;
var iCurrentPlayer = 0;
AddPlayer();
// Object of one player of a game
function Player(name,idhamster) {
    this.name = name;
    this.idhamster = idhamster;
    this.Score = new Score()
}
function AddPlayer(name,idhamster)
{

    var pPlayer = Player(name,idhamster);
    aPlayers[iCurrentPlayer] = pPlayer;
    iCurrentPlayer++;



}
function getCurrentPlayer()
{
    return iCurrentPlayer;
}
// linked object of each player
function Score(){
    this.value = 0;
    this.time = 0;
    this.add = function (addvalue,addtime) {
        this.value += addvalue;
        this.time += addtime;
    }
}

function Play (nbrPlayer) {
   //alert(nbrPlayer);
    localStorage.setItem("nbrPlayer", nbrPlayer);

}
