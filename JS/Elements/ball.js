// Everything about the ball's dynamics and collision detection
var interval;
var ballSize = 40;
var ballRadius = ballSize / 2;
var dropped = false;
var lastCoord = [0,0]; //saved previous coord to know if ball change of half-plan delimited by each element
var coord = [20,20]; //actual coordinate
var v = [0,0]; //velocity
var a = [0.002, 0.1]; //acceleration
var absorb = [0.8, 0.7]; //rebound absorption
var roll = false; //to avoid multi mini micro nano rebounds
var frameRate = 20;
var level;

function collision_rev() {
    lastCoord[0] = coord[0];
    lastCoord[1] = coord[1];
    coord[0] = coord[0] + v[0];
    coord[1] = coord[1] + v[1];
    var dist, prevDist;

    for (var i = 0; i < listCalcLines.length; i++) {
        var l = listCalcLines[i];
        var startX = l[0];
        var startY = l[1];
        var endX = l[2];
        var endY = l[3];
        var p, m; //slope and equation result of the element
        var p1 = 0;
        var p2 = 0;
        var mAngle; // angle of the line


        //calculate line slope https://www.mathforu.com/seconde/determiner-equation-droite/
        if (endX !== startX) {
            // is not a vertical line!
            m = (endY - startY) / (endX - startX);
            mAngle = Math.atan(m);

            //calculate line equation value for x=0
            p = startY - m * startX; //equation of the line
            p1 = lastCoord[1] - m * lastCoord[0]; //same equation with the previous ball position
            p2 = coord[1] - m * coord[0]; //same equation with the actual ball position
        } else {
            //in case of vertical element
            p = startX;
            p1 = lastCoord[0];
            p2 = coord[0];
            mAngle = Math.PI / 2;
        }
        // var mAngle; // angle of the line






        //considering velocity and angle of the ball
        // var mBallAngle; // angle of the ball rebound
        // var velocity;
        //
        // if (v[0] !== 0) {
        //     velocity = Math.sign(v[0]) * Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
        //     mBallAngle = Math.atan(mBall);
        //
        //     if (startX === endX)
        //         mAngle = Math.PI / 2;
        //     else
        //         mAngle = Math.atan(m);
        // }
        // else {
        //     velocity = Math.sqrt(v[1] * v[1]);
        //     mBallAngle = Math.PI / 2;
        //     mAngle = 0;
        // }


        //Orthogonal distance from ball to line
        if(startX != endX)
            dist = Math.abs(coord[1] - m * coord[0] - p) / Math.sqrt(1 + (m*m));
        else
            dist = Math.abs(coord[0] - startX);

        if(startX != endX)
            prevDist = Math.abs(lastCoord[1] - m * lastCoord[0] - p) / Math.sqrt(1 + (m*m));
        else
            prevDist = Math.abs(lastCoord[0] - startX);



        if(dist <= ballRadius && dist < prevDist){
            var x, y;
            var mBall, pBall;
            var mBallAngle; // angle of the ball rebound
            var velocity;

            //calculate equation of ball trajectory
            if (lastCoord[0] !== coord[0]) {
                // not vertical rebound
                mBall = (coord[1] - lastCoord[1]) / (coord[0] - lastCoord[0]);
                pBall = lastCoord[1] - mBall * lastCoord[0];
                velocity = Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
                mBallAngle = Math.atan(mBall);

                // if (startX === endX) {
                //     x = startX;
                //     y = pBall + mBall * x;
                // } else {
                //     x = (pBall - p) / (m - mBall); // calculate intersection between line and ball trajectory
                //     // https://lexique.netmath.ca/point-dintersection/
                //     y = pBall + mBall * x;
                // }
            } else {
                x = lastCoord[0];
                v[0] = 0;
                velocity = Math.sqrt(v[1] * v[1]);
                mBallAngle = Math.PI / 2;
            }

            // var mBallAngle; // angle of the ball rebound
            // var velocity;

            // if (v[0] !== 0) {
                // velocity = Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
                // mBallAngle = Math.atan(mBall);

                // if (startX === endX)
                //     mAngle = Math.PI / 2;
                // else
                //     mAngle = Math.atan(m);
            // }
            // else {
                // velocity = Math.sqrt(v[1] * v[1]);
                // mBallAngle = Math.PI / 2;
                // mAngle = 0;
            // }


            var d = Math.sqrt(Math.pow((endX - startX), 2) + Math.pow((endY - startY), 2));
            var d1 = Math.sqrt(Math.pow((coord[0] - startX), 2) + Math.pow((coord[1] - startY), 2));
            var d2 = Math.sqrt(Math.pow((coord[0] - endX), 2) + Math.pow((coord[1] - endY), 2));

            var da1 = Math.asin(ballRadius/d1);
            var da2 = Math.asin(ballRadius/d2);

            var l1 = ballRadius / Math.tan(da1);
            var l2 = ballRadius / Math.tan(da2);

            if(l1 <= d && l2 <= d){
                // var mBallAngle; // angle of the ball rebound
                // var velocity;

                //considering velocity before and after rebound is equals
                // if (v[0] !== 0) {
                //     velocity = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
                //     mBallAngle = Math.atan(mBall);
                // } else {
                //     velocity = Math.sqrt(v[1] * v[1]);
                //     mBallAngle = Math.PI / 2;
                // }

                var angleAfterRebound = mBallAngle - 2 * mAngle;
                v[0] = Math.round(Math.cos(-angleAfterRebound) * velocity * absorb[0] * 100) / 100;

                if (roll === false) {
                    v[1] = Math.round(Math.sin(-angleAfterRebound) * velocity * 1000) / 1000 * absorb[1];
                }
                else {
                    console.log("slow");
                    v[0] = Math.cos(-mAngle) * velocity;
                    v[1] = Math.sin(-mAngle) * velocity;
                }
                if (Math.abs(v[1]) < 2* a[1]) {
                    roll = true;
                    console.log("roll");
                }
                break;
            }
            else
                roll = false;
        }
    }
}


function  getMousePos(canvas, e) { // source https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
    var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

    return {
        x: (e.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (e.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
}

function redoLevel() { //restart the level
    window.location.reload(false);
}

function drawBall(e) {
    defineGameBox();

    ctx.clearRect(0, 0, w, h);
    integrateObject(Number(sessionStorage.getItem("level")));


    var img = new Image();
    var table = Game.getaPlayers();
    var hamster = table[1].idhamster;
    var ham = hamster.substr(0, 4);
    var avatar = ham + ".png";
    img.src = "IMAGE/Avatars/"+avatar;
    // img.src = "IMAGE/smiley.gif";
    ctx.drawImage(img , coord[0] - ballRadius, coord[1] - ballRadius, ballSize, ballSize);
    ctx.fill();
    //
    // ctx.fillStyle = "purple";
    // ctx.beginPath();
    // ctx.arc(coord[0], coord[1], ballRadius, 0, Math.PI*2, false);
    // ctx.fill();

    if(dropped === false){
        canvas.addEventListener('click', function(){
            dropped = true;
        });
        var pos = getMousePos(canvas, e);
        coord[0] = pos.x;
    }
    else{
        canvas.onmousemove = null;
        canvas.onclick = null;
        win();
        // Move the ball
        v[0] -= Math.sign(v[0]) * a[0]; // deceleration X axis
        if (roll === false)
            v[1] += a[1]; // acceleration Y axis

        collision_rev();

        if (roll === true && Math.abs(v[0]) < 0.02) {
            // clearInterval(interval);
            // interval = null;
            // console.log('stop');
            coord = [ballRadius, ballRadius];
            dropped = false;
        }
    }
}

window.onload = function() {

    var currentMatch = parseInt(sessionStorage.getItem("currentMatch"));
    var listMatch = JSON.parse(sessionStorage.getItem("listMatch"));

    document.getElementById("error").innerText = listMatch[currentMatch].player1.score + " VS " + listMatch[currentMatch].player2.score;

    if(sessionStorage.getItem("levelStarted") != "yes")
        sessionStorage.setItem("level", "0");


    level = sessionStorage.getItem("level");
    calcLines(Number(level));



    interval = setInterval(drawBall, frameRate);
};