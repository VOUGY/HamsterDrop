//Tout ce qui concerne la ball, idealement sans les elements concernant le canvas
var interval;
var onPause = false;
var lastCoord = [0,0];
var coord = [280,0];
var v = [4,0]; //velocity
var a = [0.002, 0.1]; //acceleration
var absorb = [0.9,0.9]; //rebound absorption
var potentialContact = [0,h];
var contact = [0,h];
var rebound = false;
var roll = false;
var ballSize = 20, ballRadius = ballSize / 2;
var frameRate = 20;

// function collision(){
//     contact[1] = h;
//     for(var i=0; i<listCalcLines.length; i++){ //or with listLines, to define...
//         //WORKING WITH SIMPLE HORIZONTAL COLLISION!!!!!!!!!
//         if(coord[0] >= listCalcLines[i][0] && coord[0] <= listCalcLines[i][2]){
//             startX = listLines[i][0];
//             startY = listLines[i][1];
//             var lengthX = Math.abs(coord[0] + v[0] - startX);
//             tilt = listLines[i][3];
//             if(Math.abs(potentialContact[1] - coord[1]) > Math.abs(coord[1] + v[1] - startY)) {
//                 potentialContact[1] = startY + (Math.tan(tilt) * lengthX);
//             }
//             if(v[1] > 0 && coord[1] < potentialContact[1])
//                 contact[1] = potentialContact[1];
//             else if(v[1] < 0 && coord[1] > potentialContact[1])
//                 contact[1] = potentialContact[1];
//         }
//     }
// }

function collision_rev(){
    for(var i=0;i<listCalcLines.length;i++){
        var l = listCalcLines[i];
        var startX = l[0];
        var startY = l[1];
        var endX = l[2];
        var endY = l[3];
        var status = l[4];
        var p, m;


        var nextCoord = [coord[0] + v[0],coord[1] + v[1]];

        var p1, p2;
        //calculate line slope https://www.mathforu.com/seconde/determiner-equation-droite/
        if(endX !== startX) {// is not a vertical line!
            m = (endY - startY) / (endX - startX);

            //calculate line equation value for x=0
            p = startY - m * startX; //equation of the line
            p1 = coord[1] - m * coord[0]; //same equation with the actual ball position
            p2 = (coord[1] + v[1]) - m * (coord[0] + v[0]); //same equation with the next ball position
        }
        else{
            p = startX;
            p1 = coord[0];
            p2 = nextCoord[0];
        }

        if(Math.sign(p - p1) !== Math.sign(p - p2)){ //https://fr.wikipedia.org/wiki/Demi-plan

            var x,y;
            //calculate equation of ball trajectory
            if(nextCoord[0] !== coord[0]) { // not vertical rebound
                var mBall = (nextCoord[1] - coord[1]) / (nextCoord[0] - coord[0]);
                var pBall = coord[1] - mBall * coord[0];

                if(startX === endX){
                    x = startX;
                    y = pBall + mBall * x;
                }
                else{
                    x = (pBall - p) / (m - mBall); // calculate intersection between line and ball trajectory
                    // https://lexique.netmath.ca/point-dintersection/
                    y = pBall + mBall * x;
                }
            }
            else {
                x = coord[0];
                y = p + m*x;
            }
            if(x > startX && x < endX || y > startY && y < endY) {
                coord[0] = x;
                coord[1] = y;
                var mAngle;
                var mBallAngle;
                var velocity;

                //considering velocity before and after rebound is equals
                if(v[0] !== 0) {
                    velocity = Math.sign(v[0]) * Math.sqrt(v[0] * v[0] + v[1] * v[1]);
                    mBallAngle = Math.atan(mBall);
                    if(startX === endX)
                        mAngle = Math.PI / 2;
                    else
                        mAngle = Math.atan(m);
                }
                else {
                    velocity = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
                    mBallAngle = Math.PI/2;
                    mAngle = 0;
                }

                var angleAfterRebound =  mBallAngle - 2*mAngle;

                v[0] = Math.round(Math.cos(-angleAfterRebound) * velocity * absorb[0]*100)/100;
                v[1] = Math.round(Math.sin(-angleAfterRebound) * velocity * absorb[1]*100)/100;
            }
            else
                status *= -1;
        }
    }
}

// function bounce(){
//     if(coord[0] === ballRadius) //rebound on right side
//         v[0] *= -absorb[0];
//     else if(coord[0] === w - ballRadius) //rebound on left side
//         v[0] *= -absorb[0];
//     else if(coord[1] === contact[1] - Math.sign(v[1])*ballRadius && roll === false){
//         if(Math.abs(v[1]) < a[1]){
//             v[1] = 0;
//             roll = true;
//         }
//         else
//             v[1] *= -absorb[1];
//     }
// }
//
// function bounce_rev() { //work only with wall and floor
//     if (coord[0] + ballRadius + v[0] > w) { //rebound on right side
//         coord[0] = w - ballRadius;
//         v[0] *= -absorb[0];
//     }
//     else if (coord[0] - ballRadius + v[0] < 0) { //rebound on left side
//         coord[0] = ballRadius;
//         v[0] *= -absorb[0];
//     }
//     else
//         coord[0] += v[0];
//
//     if (roll === false && Math.abs(v[1]) >= a[1]) {
//         if (coord[1] + ballRadius + v[1] > h) {
//             coord[1] = h - ballRadius;
//             v[1] *= -absorb[1];
//         }
//         else
//             coord[1] += v[1];
//     }
//     if(coord[1] === h - ballRadius && Math.abs(v[1]) < a[1])
//         roll = true;
// }


function drawBall() {

    defineGameBox();
    // Move the ball
    v[0] -= Math.sign(v[0])*a[0]; // decelerating X axis
    if(roll === false)
        v[1] += a[1]; // aerating Y axis
    lastCoord[0] = coord[0];
    lastCoord[1] = coord[1];
    // bounce_rev();
    collision_rev();



    //Anticipate wall rebound
    // if(coord[0] - ballRadius + (v[0] - a[0]) < 0)//left side
    //     coord[0] = ballRadius;
    // else if(coord[0] + ballRadius + (v[0] - a[0]) > w)//right side
    //     coord[0] = w - ballRadius;
    // else
        coord[0] += v[0];

    //Anticipate horizontal rebound
    // if(roll === false){
    //     if(v[1] > 0 && coord[1] < contact[1] && coord[1] + ballRadius + v[1] + a[1] > contact[1])
    //         coord[1] = contact[1] - ballRadius;
    //     else if(v[1] < 0 && coord[1] > contact[1] && coord[1] - ballRadius + v[1] + a[1] < contact[1])
    //         coord[1] = contact[1] + ballRadius;
    //     else
            coord[1] += v[1]; // falling (if v < 0)
    // }

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
    calcRect();

    interval = setInterval(drawBall, frameRate);

    canvas.addEventListener('click', function(){
        // if(onPause === false){
        //     drawBall().pause();
        //     onPause = true;
        // }
        // else if(onPause === true){
        //     drawBall();
        //     onPause = false;
        // }

        clearInterval(interval);
        interval = null;
        console.log('stop');
    });
};