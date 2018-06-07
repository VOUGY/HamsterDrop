function hamsterTimeline(playerOneScore)
{
    var i = 1;
    document.getElementById("NS_hamsterOne").disabled = true;
    document.getElementById("NS_hamsterTwo").disabled = true;
    document.getElementById("NS_hamsterOne").value = i;
    document.getElementById("NS_hamsterTwo").value = i;

    setInterval(function (){
        do {
            if(i < playerOneScore)
                document.getElementById("NS_hamsterOne").value = i;
            else
            {
                document.getElementById("resultField").innerHTML = "PLAYER ONE FINISHED !";
                document.getElementById("NS_hamsterOne").style.background = "#92f442";
            }
            document.getElementById("NS_hamsterTwo").value = i++;
        }while(i>24000);
    }, 5);
}