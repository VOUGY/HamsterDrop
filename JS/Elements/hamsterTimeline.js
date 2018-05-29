function hamsterTimeline(playerOneScore)
{
    var i = 1;
    document.getElementById("hamsterOne").disabled = true;
    document.getElementById("hamsterTwo").disabled = true;
    document.getElementById("hamsterOne").value = i;
    document.getElementById("hamsterTwo").value = i;

    setInterval(function (){
        do {
            if(i < playerOneScore)
                document.getElementById("hamsterOne").value = i;
            else
            {
                document.getElementById("resultField").innerHTML = "PLAYER ONE FINISHED !";
                document.getElementById("hamsterOne").style.background = "#92f442";
            }

            document.getElementById("hamsterTwo").value = i++;
        }while(i>24000);
    }, 5);
}