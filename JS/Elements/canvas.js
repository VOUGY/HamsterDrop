//Ce qui concerne le canvas (taille, contexte, couleur, ...)

var h = 400, w = 600,
    canvas, ctx, interval,
    line;

function defineGameBox(){
    canvas = document.getElementById('c');
    ctx = canvas.getContext('2d');

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
    line = new drawLine(200,200,150,Math.PI/6);
}


