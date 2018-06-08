function win(){

    if(coord[0] + ballRadius >= goal[0] && coord[0] < goal[0] + goal[2] - ballRadius && coord[1] + ballRadius >= goal[1] - goal[3] - (goal[2] /2)){

        clearInterval(interval);

        level++;
        sessionStorage.setItem("levelStarted", "yes");

        var currentPlayer = parseInt(sessionStorage.getItem("currentPlayer"));
        var currentMatch = parseInt(sessionStorage.getItem("currentMatch"));

        var listPlayers = JSON.parse(sessionStorage.getItem("listPlayers"));
        var listMatch = JSON.parse(sessionStorage.getItem("listMatch"));

        if(!isOdd(currentPlayer))
        {
            var match = new Match(listPlayers[currentPlayer], listPlayers[currentPlayer + 1]);
            var score = parseInt(listMatch[currentMatch].player1.score + parseInt(document.getElementById("NS_hamsterTwo").value));

            var p1 = new PlayerNico(match.getPOne().id, match.getPOne().name, match.getPOne().idHamster, score);
            var p2 = new PlayerNico(match.getPTwo().id, match.getPTwo().name, match.getPTwo().idHamster, match.getPTwo().score);

            match.setPOne(p1);
            match.setPTwo(p2);

            listMatch[currentMatch] = match;
            listPlayers[currentPlayer] =  p1;
        }
        else
        {
            var match = new Match(listPlayers[currentPlayer - 1], listPlayers[currentPlayer]);
            var score = parseInt(listMatch[currentMatch].player2.score + parseInt(document.getElementById("NS_hamsterTwo").value));

            var p1 = new PlayerNico(match.getPOne().id, match.getPOne().name, match.getPOne().idHamster, match.getPOne().score);
            var p2 = new PlayerNico(match.getPTwo().id, match.getPTwo().name, match.getPTwo().idHamster, score);

            match.setPOne(p1);
            match.setPTwo(p2);

            listMatch[currentMatch] = match;
            listPlayers[currentPlayer] =  p2;
        }

        sessionStorage.setItem("listPlayers",JSON.stringify(listPlayers));
        sessionStorage.setItem("listMatch", JSON.stringify(listMatch));

        if(level == 3)
        {
            if(!isOdd(currentPlayer))
            {
                currentPlayer++;
                sessionStorage.setItem("currentPlayer", String(currentPlayer));
                sessionStorage.setItem("TourOnePlayed", "yes");
            }

            else
            {

                var p1 = new PlayerNico(match.getPOne().id, match.getPOne().name, match.getPOne().idHamster, match.getPOne().score);
                var p2 = new PlayerNico(match.getPTwo().id, match.getPTwo().name, match.getPTwo().idHamster, match.getPTwo().score);

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

                        sessionStorage.setItem("currentPlayer", "0");
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

function isOdd(num) { return num % 2;} //SOURCE https://stackoverflow.com/questions/5016313/how-to-determine-if-a-number-is-odd-in-javascrip