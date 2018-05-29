//Ce qui concerne le canvas (taille, contexte, couleur, ...)

var h = 600, w = 800,
    canvas = document.getElementById('c'), ctx = canvas.getContext('2d'), interval,
    line;


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
    canvas.style.backgroundColor = "white";
}


function integrateObject(){
    // drawLines(listCalcLines);
    drawLines_rev(line);
    drawGoal();
    // drawRects(listCalcRect);
}
