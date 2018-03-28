//Tout ce qui concerne la ball, idealement sans les elements concernant le canvas

var gameHeight = 400, gameWidth = 400,
    canvas, ctx, interval,
    h = gameHeight, a = 0.1, v = 0, ballAbsorption = 0.8,
    ballSize = 20, ballRadius = ballSize / 2, frameRate = 20;


function defineGameBox(){

    canvas = document.getElementById('c');
    ctx = canvas.getContext('2d');


    var w = window.innerWidth;
    var h = window.innerHeight;

    var gamebox = document.getElementById("c");
    gamebox.style.position = "absolute";
    gamebox.style.border = "1px solid #000";

    var l = (w - gameWidth)/2;
    var t = (h - gameHeight)/2;
    gamebox.style.left = l.toString();
    gamebox.style.top = t.toString();


}

function integrateObject(object){
    canvas = document.getElementById('c');

}

function rebound(){

}


function drawBall() {
    if(h <= 0 && v > 0) {
        console.log('bong');
        v *= -1 * ballAbsorption; // bounding with less velocity

        if(v > -0.1 && v < 0.1) {
            clearInterval(interval);
            interval = null;
            console.log('stop');
        }
    }

    // Move the ball
    v += a; // accelerating
    h -= v; // falling (if v < 0)

    // drawing ball
    ctx.clearRect(0, 0, gameHeight, gameWidth);

    drawLines(250, 150, 10, 0);

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(gameWidth/2, gameHeight - h - ballRadius, ballRadius, 0, Math.PI*2,true);
    ctx.fill();
}
window.onload = function() {
        canvas = document.getElementById('c');
        canvas.height = gameHeight;
        canvas.width = gameWidth;
        defineGameBox();
        ctx = canvas.getContext("2d");

        interval = setInterval(drawBall, frameRate);

        canvas.addEventListener('click', function(){
            h = gameHeight;
            v = 0;
            if(!interval) {
                interval = setInterval(drawBall, frameRate);
            }
        });


}