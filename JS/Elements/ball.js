//Tout ce qui concerne la ball, idealement sans les elements concernant le canvas
var interval;
var lastCoord = [0,0];
var coord = [100,h];
var velocity = [3,0];
var accel = [0.005, 0.1];
var absorb = 0.7;
var contactY = 0;
var rebound = false;
var roll = false;
var ballSize = 20, ballRadius = ballSize / 2;
var frameRate = 20;

function bounce(){
    if(coord[1] - ballRadius === contactY){
        velocity[1] *= -1 * absorb;
        if(Math.abs(velocity[1]) < accel[1])
            roll = true;
    }
    if(coord[0] + ballRadius === w || coord[0] - ballRadius === 0)
        velocity[0] *= -1 * absorb;
}

function collision(){
    var contactYList;
    var potentialContactY;

    for(var j=0; j<listLines.length; j++){
        if(coord[0] >= listCalcLines[j][0] && coord[0] <= listCalcLines[j][2]){
            startX = listLines[j][0];
            startY = listLines[j][1];
            var lengthX = coord[0] - startX;
            tilt = listLines[j][3];
            contactY = 0;
            potentialContactY = h - (startY + Math.sin(tilt)*lengthX);
            // console.log("potential contact "+potentialContactY+" et coordY "+coord[1]);

            if(velocity[1] > 0 && coord[1] > potentialContactY && coord[1] + velocity[1] + accel[1] < potentialContactY ||
                velocity[1] < 0 && coord[1] < potentialContactY && coord[1] + ballRadius + velocity[1] - accel[1] > potentialContactY
            ){
                contactY = potentialContactY;
            }
        }
    }
}

function drawBall() {
    defineGameBox();
    bounce();
    collision();

    console.log(coord[1]);
    // Move the ball
    velocity[0] -= Math.sign(velocity[0])*accel[0]; // deccelerating X axis
    velocity[1] += accel[1]; // accelerating Y axis
    lastCoord[0] = coord[0];
    lastCoord[1] = coord[1];

    //Anticipate wall rebound
    if(coord[0] - ballRadius + (velocity[0] - accel[0]) < 0)
        coord[0] = ballRadius;
    else if(coord[0] + ballRadius + (velocity[0] - accel[0]) > w)
        coord[0] = w - ballRadius;
    else
        coord[0] += velocity[0];

    //Anticipate floor rebound
    if(roll === false){
        if(coord[1] - ballRadius - velocity[1] - accel[1] < contactY)
            coord[1] = contactY + ballRadius;
        // else if(velocity[1] < 0 && coord[1] + ballRadius + velocity[1] - accel[1] > contactY)
        // 		coord[1] = contactY - ballRadius;
        else
            coord[1] -= velocity[1]; // falling (if v < 0)
    }

    if(roll === true && Math.abs(velocity[0]) < 0.02){
        clearInterval(interval);
        interval = null;
        console.log('stop');
    }

    // drawing ball
    ctx.clearRect(0, 0, w, h);
    integrateObject();

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(coord[0], h - coord[1], ballRadius, 0, Math.PI*2, false);
    ctx.fill();
}

window.onload = function() {
    calcLines();
    interval = setInterval(drawBall, frameRate);

    canvas.addEventListener('click', function(){
        clearInterval(interval);
        interval = null;
        console.log('stop');
    });
}