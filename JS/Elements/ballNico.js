// Everything about the ball's dynamics and collision detection
var interval;
var ballSize = 20;
var ballRadius = ballSize / 2;
var dropped = false;
// var lastCoord = [0,0]; //saved previous coord to know if ball change of half-plan delimited by each element
var coord = [0,15]; //actual coordinate
var nextCoord = [340,0];
var v = [0.2,0.2]; //velocity
var a = [0.002, 0.1]; //acceleration
var absorb = [0.8, 0.8]; //rebound absorption
var roll = false; //to avoid multi mini micro nano rebounds
var frameRate = 20;
var level;

function collision_rev2(){
    for(var i=0;i<listCalcLines.length;i++){
        var l = listCalcLines[i];
        var startX = l[0];
        var startY = l[1];
        var endX = l[2];
        var endY = l[3];
        var status = l[4];
        var p, m;

        nextCoord = [coord[0] + v[0],coord[1] + v[1]];

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
                var mAngle;
                if(v[0] !== 0) {
                    if (startX === endX)
                        mAngle = Math.PI / 2;
                    else
                        mAngle = Math.atan(m);
                }
                else
                    mAngle = 0;

                var dx = Math.abs(Math.sin(mAngle) * ballRadius);
                var dy = Math.abs(Math.cos(mAngle) * ballRadius);

                coord[0] = x - Math.sign(v[0]) * dx;
                coord[1] = y - Math.sign(v[1]) * dy;

                var mBallAngle;
                var velocity;

                //considering velocity before and after rebound is equals
                if(v[0] !== 0) {
                    velocity = Math.sign(v[0]) * Math.sqrt(v[0] * v[0] + v[1] * v[1]);
                    mBallAngle = Math.atan(mBall);
                }
                else {
                    velocity = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
                    mBallAngle = Math.PI/2;
                }

                var angleAfterRebound =  mBallAngle - 2*mAngle;

                v[0] = Math.round(Math.cos(-angleAfterRebound) * velocity * absorb[0]*100)/100;
                v[1] = Math.round(Math.sin(-angleAfterRebound) * velocity * absorb[1]*100)/100;
            }
            else
                status *= -1;
        }
    }
    coord[0] += v[0];
    coord[1] += v[1]; // falling (if v < 0)
}

function win(){

    if(coord[0] + ballRadius >= goal[0] && coord[0] < goal[0] + goal[2] - ballRadius && coord[1] + ballRadius >= goal[1] - goal[3] - (goal[2] /2)){

        clearInterval(interval);

        level++;
        sessionStorage.setItem("levelStarted", "yes");

        var currentPlayer = parseInt(sessionStorage.getItem("currentPlayer"));
        var currentMatch = parseInt(sessionStorage.getItem("currentMatch"));

        var listPlayers = JSON.parse(sessionStorage.getItem("listPlayers"));
        var listMatch = JSON.parse(sessionStorage.getItem("listMatch"));

        if(isOdd(currentPlayer) == 0)
        {
            var player = new PlayerNico(listMatch[currentMatch].player1);
            var score = parseInt(listMatch[currentMatch].player1.score + document.getElementById("NS_hamsterTwo").value);
            player.setScore(score);

            var match = new Match(listMatch[currentMatch]);
            match.setPOne(player);

            alert("score : " + player.getScore());
            listMatch[currentMatch] = match;
            listPlayers[currentPlayer] =  player;
        }
        else
        {
            var player = new PlayerNico(listPlayers[currentPlayer]);
            var score = listMatch[currentMatch].player2.score + document.getElementById("NS_hamsterTwo").value;
            player.setScore(score);

            var match = new Match(listMatch[currentMatch]);
            match.setPTwo(player);

            listMatch[currentMatch] = match;
            listPlayers[currentPlayer] =  player;
        }

        sessionStorage.setItem("listPlayers",JSON.stringify(listPlayers));
        sessionStorage.setItem("listMatch", JSON.stringify(listMatch));

        if(level == 3)
        {
            if(isOdd(parseInt(sessionStorage.getItem("currentPlayer"))) == 1)
            {
                currentPlayer++;
                sessionStorage.setItem("currentPlayer", String(currentPlayer));
                sessionStorage.setItem("TourOnePlayed", "yes");
            }

            else
            {

                var p1 = new PlayerNico(listPlayers[currentPlayer-1]);
                var p2 = new PlayerNico(listPlayers[currentPlayer]);

                if(p1.getScore() > p2.getScore())
                {
                    //P2 WINS
                    p1.setLose(1);
                    sessionStorage.setItem("result", "Player 2 won !");

                }
                else
                {
                    p2.setLose(1);
                    sessionStorage.setItem("result", "Player 1 won !");
                }


                listPlayers[currentPlayer-1] = p1;
                listPlayers[currentPlayer] = p2;

                sessionStorage.setItem("listPlayers", JSON.stringify(listPlayers));

                alert("NEXT MATCH");
                var temp = parseInt(sessionStorage.getItem("currentMatch"));
                temp++;
                sessionStorage.setItem("currentMatch", "1");

                if(listMatch.length == currentMatch+1)
                {
                    alert("end of round");
                    if(listMatch.length != 1)
                    {
                        sessionStorage.setItem("listPlayers", JSON.stringify(
                            getWinners(JSON.parse(
                                sessionStorage.getItem("listPlayers")
                            ))
                        ));

                        listPlayers = sessionStorage.getItem("listPlayers");
                        currentPlayer = new PlayerNico(listPlayers[0]);
                        sessionStorage.setItem("currentPlayer", String(currentPlayer.getID()));
                    }
                    else
                    {
                        alert("END OF GAME");
                    }

                }
                else
                {
                    currentPlayer++;
                    sessionStorage.setItem("currentPlayer", String(currentPlayer));
                }
            }
            sessionStorage.setItem("levelStarted", "no");
            sessionStorage.setItem("level", undefined);
        }
        else
        {
            sessionStorage.setItem("level", String(level));
        }

        window.location.reload(false);
    }
}

function isOdd(num) { return num % 2;} //SOURCE https://stackoverflow.com/questions/5016313/how-to-determine-if-a-number-is-odd-in-javascript


function  getMousePos(canvas, evt) { // source https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
    var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

    return {
        x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
}

function redoLevel() { //restart the level
    window.location.reload(false);
}

function drawBall(e) {
    defineGameBox();

    ctx.clearRect(0, 0, w, h);
    integrateObject(Number(sessionStorage.getItem("level")));


    ctx.fillStyle = "purple";
    ctx.beginPath();
    ctx.arc(coord[0], coord[1], ballRadius, 0, Math.PI*2, false);
    ctx.fill();


    if(dropped === false){
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

        collision_rev2();

        if (roll === true && Math.abs(v[0]) < 0.02) {
            clearInterval(interval);
            interval = null;
            console.log('stop');
        }

        // drawing ball
        ctx.clearRect(0, 0, w, h);
        integrateObject(Number(sessionStorage.getItem("level")));

        ctx.fillStyle = "purple";
        ctx.beginPath();
        ctx.arc(coord[0], coord[1], ballRadius, 0, Math.PI*2, false);
        ctx.fill();
    }
}

window.onload = function() {

    var currentMatch = parseInt(sessionStorage.getItem("currentMatch"));
    var listMatch = JSON.parse(sessionStorage.getItem("listMatch"));

    document.getElementById("error").innerText = listMatch[currentMatch].player1.score + " VS " + listMatch[currentMatch].player2.score;

    if(sessionStorage.getItem("levelStarted") != "yes")
    {
        sessionStorage.setItem("level", "0");
    }


    level = sessionStorage.getItem("level");
    calcLines(Number(level));


    interval = setInterval(drawBall, frameRate);

    canvas.addEventListener('click', function(){
        dropped = true;
    });
};