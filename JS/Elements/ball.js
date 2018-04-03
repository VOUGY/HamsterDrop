//Tout ce qui concerne la ball, idealement sans les elements concernant le canvas
var interval,
    ballY = h, a = 0.1, v = 0, ballAbsorption = 0.8,
    ballSize = 20, ballRadius = ballSize / 2, frameRate = 20;

function bounce(){
    if(ballY <= 0 && v > 0) {
        console.log('bong');
        v *= -1 * ballAbsorption; // bounding with less velocity

        if(v > -0.1 && v < 0.1) {
            clearInterval(interval);
            interval = null;
            console.log('stop');
        }
    }
}

function collision(){
    if(ballY <= line.startY){
        console.log('bing');
        v *= -1 * ballAbsorption; // bounding with less velocity

        if(v > -0.1 && v < 0.1) {
            clearInterval(interval);
            interval = null;
            console.log('stop');
        }
    }
}

function drawBall() {
    bounce();

    // Move the ball
    v += a; // accelerating
    ballY -= v; // falling (if v < 0)

    // drawing ball
    ctx.clearRect(0, 0, h, w);
    integrateObject();

    // console.log(line.startY);
    collision();

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(w/2, h - ballY - ballRadius, ballRadius, 0, Math.PI*2, false);
    ctx.fill();
}



window.onload = function() {
    defineGameBox();

    interval = setInterval(drawBall, frameRate);

    canvas.addEventListener('click', function(){
        ballY = h;
        v = 0;
        console.clear();
        if(!interval) {
            interval = setInterval(drawBall, frameRate);
        }
    });
}