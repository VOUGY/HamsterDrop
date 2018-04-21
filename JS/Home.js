/*var iNbrPlayers = 2;
var lPlayers;*/
function AcceptPlay()
{

  document.getElementById("GV_btnPlay").setAttribute("style", "background-color:green");
 //  document.getElementById("GV_btnPlay").setAttribute("style", "display:none")

    var elem = document.getElementById("GV_btnPlay");
    var pos = 50;
    var id = setInterval(frame, 10);
    function frame() {
        if (pos == -10) {
            clearInterval(id);
        } else {
            pos--;

            elem.style.marginLeft = pos + '%';
          //  alert(elem.style.marginLeft)
        }
        elem = document.getElementById("DIV_btnPlay")
        elem.parentNode.removeChild(elem);
    }


}
function NbrPlayer(nbrPlayer, e)
{

    e.target.setAttribute("style", "background-color:green");
    e.target.setAttribute("style", "border:green");

    this.nbrplayer = nbrPlayer;
    alert(nbrPlayer);
    var elem = e.target;
    var pos = 50;
    var id = setInterval(frame, 8);
    function frame() {
        if (pos == -100) {
            clearInterval(id);

        } else {
            pos--;

            elem.style.marginLeft = pos + '%';
            //  alert(elem.style.marginLeft)
        }
    }
}

