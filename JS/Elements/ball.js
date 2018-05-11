//Tout ce qui concerne la ball, idealement sans les elements concernant le canvas
var interval;
var lastCoord = [0,0];
var coord = [20,0];
var v = [5,0]; //velocity
var a = [0.005, 0.1]; //acceleration
var absorb = 0.7; //rebound absorption
var potentialContact = [0,h];
var contact = [0,h];
var rebound = false;
var roll = false;
var ballSize = 20, ballRadius = ballSize / 2;
var frameRate = 20;

function collision(){
    contact[1] = h;
    for(var i=0; i<listLines.length; i++){
        if(coord[0] >= listCalcLines[i][0] && coord[0] <= listCalcLines[i][2]){
            startX = listLines[i][0];
            startY = listLines[i][1];
            var lengthX = Math.abs(coord[0] + v[0] - startX);
            tilt = listLines[i][3];
            if(Math.abs(potentialContact[1] - coord[1]) > Math.abs(coord[1] + v[1] - startY)) {
                potentialContact[1] = startY + (Math.tan(tilt) * lengthX);
                console.log(lengthX+" length et contact pot "+potentialContact[1]);
            }
            if(v[1] > 0 && coord[1] < potentialContact[1])
                contact[1] = potentialContact[1];
            else if(v[1] < 0 && coord[1] > potentialContact[1])
                contact[1] = potentialContact[1];
        }
    }
}

function bounce(){
    if(coord[0] === ballRadius) //rebound on right side
        v[0] *= -absorb;
    else if(coord[0] === w - ballRadius) //rebound on left side
        v[0] *= -absorb;
    else if(coord[1] === contact[1] - Math.sign(v[1])*ballRadius && roll === false){
        if(Math.abs(v[1]) < a[1]){
            v[1] = 0;
            roll = true;
        }
        else{
            v[1] *= -absorb;
            console.log(coord[1]+" "+contact[1]);
        }
    }
}

function drawBall() {
    defineGameBox();
    collision();
    bounce();
    // Move the ball
    v[0] -= Math.sign(v[0])*a[0]; // decelerating X axis
    if(roll === false)
      v[1] += a[1]; // aerating Y axis
    lastCoord[0] = coord[0];
    lastCoord[1] = coord[1];

    //Anticipate wall rebound
    if(coord[0] - ballRadius + (v[0] - a[0]) < 0)//left side
        coord[0] = ballRadius;
    else if(coord[0] + ballRadius + (v[0] - a[0]) > w)//right side
        coord[0] = w - ballRadius;
    else
        coord[0] += v[0];

    //Anticipate horizontal rebound
    if(roll === false){
        if(v[1] > 0 && coord[1] < contact[1] && coord[1] + ballRadius + v[1] + a[1] > contact[1])
            coord[1] = contact[1] - ballRadius;
        else if(v[1] < 0 && coord[1] > contact[1] && coord[1] - ballRadius + v[1] + a[1] < contact[1])
            coord[1] = contact[1] + ballRadius;
        else
            coord[1] += v[1]; // falling (if v < 0)
    }

    if(roll === true && Math.abs(v[0]) < 0.02){
        clearInterval(interval);
        interval = null;
        console.log('stop');
    }

    // drawing ball
    ctx.clearRect(0, 0, w, h);
    integrateObject();

    ctx.fillStyle = "purple";
    ctx.beginPath();
    ctx.arc(coord[0], coord[1], ballRadius, 0, Math.PI*2, false);
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