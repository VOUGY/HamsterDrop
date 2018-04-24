//Ce qui concerne le canvas (taille, contexte, couleur, ...)

var h = 400, w = 600,
    canvas = document.getElementById('c'), ctx = canvas.getContext('2d'), interval,
    line;

function defineGameBox(){
    console.log(h);
    canvas.height = h;
    canvas.width = w;

    var windowW = window.innerWidth;
    var windowH = window.innerHeight;
    var l = (windowW - w)/2;
    var t = (windowH - h)/2;

    canvas.style.position = "absolute";
    canvas.style.border = "1px solid #000";
    canvas.style.left = l.toString();
    canvas.style.top = t.toString();
}

function integrateObject(){
    drawLines(listCalcLines);
}


