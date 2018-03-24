/*var iNbrPlayers = 2;
var lPlayers;*/
function AcceptPlay()
{

   document.getElementById("GV_btnPlay").setAttribute("style", "background-color:red");
   document.getElementById("GV_btnPlay").setAttribute("style", "display:none")
    var elem = document.getElementsByClassName("GV_btnPlay");
    var pos = 350;
    var id = setInterval(frame, 4);
    function frame() {
        if (pos == 0) {
            clearInterval(id);
        } else {
            pos--;


            elem.style.position = pos + 'px';
        }
    }
}

function animateMenu()
{

}