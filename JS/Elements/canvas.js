// Everything about the canvas

var h = 600, w = 800;
var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d')
var interval, line;

function defineGameBox(){
    canvas.height = h;
    canvas.width = w;
    var windowW = window.innerWidth;
    var windowH = window.innerHeight;
    var l = (windowW - w)/2;
    var t = (windowH - h)/2;



    document.getElementById("header").style.height = t.toString();
    document.getElementById("footer").style.height = t.toString();
    document.getElementById("left").style.width = l.toString();
    document.getElementById("right").style.width = l.toString();

    canvas.style.position = "absolute";
    canvas.style.left = l.toString();
    canvas.style.top = t.toString();
//    canvas.style.backgroundColor = "white";

}


function integrateObject(level){
    var bg = new Image();

    switch(level) {
        case 1:
            bg.src = "IMAGE/GameWindow/houseBack.jpg";
            break;
        case 2:
            bg.src = "IMAGE/GameWindow/townBack.jpg";
            break;
        case 3:
            bg.src = "IMAGE/GameWindow/forestBack.jpg";
            break;
        default:
            bg.src = "IMAGE/GameWindow/wood.jpg";
    }

    ctx.drawImage(bg,0,0,800,600);
    drawLines_rev(level);
    drawGoal();
}
