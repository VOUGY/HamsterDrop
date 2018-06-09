function hamsterTimeline(playerOneScore) //playerOneScore defines where the player one hamster will stop
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
                document.getElementById("NS_hamsterOne").style.background = "#92f442"; //change color when player one finishes
            }
            document.getElementById("NS_hamsterTwo").value = i++;
        }while(i>8000);
    }, 5);
}