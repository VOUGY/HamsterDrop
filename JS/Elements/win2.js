function win(){

    if(coord[0] + ballRadius >= goal[0] && coord[0] < goal[0] + goal[2] - ballRadius && coord[1] + ballRadius >= goal[1] - goal[3] - (goal[2] /2)){

        //clearInterval(interval);

        level++;

        sessionStorage.setItem("levelStarted", "yes");

        var currentPlayer = parseInt(sessionStorage.getItem("currentPlayer"));
        var currentMatch = parseInt(sessionStorage.getItem("currentMatch"));

        var listPlayers = JSON.parse(sessionStorage.getItem("listPlayers"));
        var listMatch = JSON.parse(sessionStorage.getItem("listMatch"));
        var match= new Match(
            new Player(listMatch[currentMatch].player1.id,listMatch[currentMatch].player1.name,listMatch[currentMatch].player1.idhamster,listMatch[currentMatch].player1.score),
            new Player(listMatch[currentMatch].player2.id,listMatch[currentMatch].player2.name,listMatch[currentMatch].player2.idhamster,listMatch[currentMatch].player1.score)
        );


        if(!isOdd(currentPlayer))
        {
           // var score = parseInt(listMatch[currentMatch].player1.score + parseInt(document.getElementById("NS_hamsterTwo").value));
            match.player1.score +=parseInt(document.getElementById("NS_hamsterTwo").value);
        }
        else
        {
            match.player2.score +=parseInt(document.getElementById("NS_hamsterTwo").value);
       //     var score = parseInt(listMatch[currentMatch].player2.score + parseInt(document.getElementById("NS_hamsterTwo").value));
        }


        listMatch[currentMatch] = match;

        sessionStorage.setItem("listPlayers",JSON.stringify(listPlayers));
        sessionStorage.setItem("listMatch", JSON.stringify(listMatch));

        if(level == 3) //check if last level
        {
            if(!isOdd(currentPlayer)) //check if player one or player two
            {
                currentPlayer++; //player one
                sessionStorage.setItem("currentPlayer", String(currentPlayer));
                sessionStorage.setItem("TourOnePlayed", "yes");
            }
            else //player two
            {
                if(match.player1.getScore() > match.player2.getScore())
                {
                    //P2 WINS
                    match.player1.setLose(1);
                    sessionStorage.setItem("result", "Player 2 won !");

                }
                else
                {
                    match.player2.setLose(1);
                    sessionStorage.setItem("result", "Player 1 won !");
                }


                listPlayers[currentPlayer-1] = match.player1;
                listPlayers[currentPlayer] = match.player2;

                sessionStorage.setItem("listPlayers", JSON.stringify(listPlayers));

                var temp = parseInt(sessionStorage.getItem("currentMatch"));
                temp++;
                sessionStorage.setItem("currentMatch", temp);

                if(listMatch.length == 1) //check if any matches left
                {
                    alert(sessionStorage.getItem("result"));
                    Game.closeGame();
                    document.location.replace("VOUG_Prepa/GameBegin.html");
                }
                else if(listMatch.length == 2)
                {
                    // New round
                    if(currentMatch==2)
                    {
                        alert("end of round");
                        sessionStorage.setItem("listPlayers", JSON.stringify(
                            getWinners(JSON.parse(
                                sessionStorage.getItem("listPlayers")
                            )) ));
                    }
                    else { // Next match in the round
                        sessionStorage.setItem("currentPlayer", "0");
                        var nextMatch = parseInt(sessionStorage.getItem("currentMatch"));
                        nextMatch++;
                        sessionStorage.setItem("currentMatch", nextMatch);
                        sessionStorage.setItem("TourOnePlayed", "yes");

                    }

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

function isOdd(num) { return num % 2;} //SOURCE https://stackoverflow.com/questions/5016313/how-to-determine-if-a-number-is-odd-in-javascrip