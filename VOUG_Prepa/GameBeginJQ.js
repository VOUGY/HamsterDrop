$(document).ready(function () {


    $("#btnPlayInit").click(function () {
        //alert("click");
        $(this).animate({ "left": "-=1000px" }, "fast").fadeOut( "low", function () {
            $("#dBoxNbrPlayer").css("visibility", "visible");
            $("#dBoxNbrPlayer").fadeIn("low");
            //      $("#btnPlay2").css("background-color","red");
            //       document.getElementById("btnPlay2").style.visibility = "visible";
        });
    });


    $(".btnChoiceNbrPlayer").click(function () {
        // alert());
        //////////////////////////////////////
        // Create Object PLAY
        Game.setiTotalPlayer($(this).attr("value"));


        $("#dBoxNbrPlayer button").each(function() {
            $(this).animate({ "left": "-=1000px" }, "fast").fadeOut("low", function () {
                $("#dBoxInfoPlayer").css("visibility", "visible");

            });
        });

        /////////////////////////////////////
    });

    $("#btnValidatePlayer").click(function () {
        //  alert($("#iptNamePlayer").text())
        var someimage = document.getElementById('hPlayer');
        var myimg = someimage.getElementsByTagName('img')[0];
        var mysrc = myimg.src;
        var namePicture = mysrc.split("/");
        Game.addPlayer(document.getElementById("sNamePlayer").value,namePicture[namePicture.length-1]);


        if(Game.getiCurrentUser() >  Game.getiTotalPlayer())
        {
            $("#dBoxInfoPlayer *").each(function() {
                $(this).animate({ "left": "-=1000px" }, "fast").fadeOut("low", function () {
                    $("#localisation").css("visibility", "visible");
                    // alert(aPlayers);
                    localStorage.removeItem("Game");
                    localStorage.setItem("Game", JSON.stringify(Game));
                });
            });
        } else
        {
            $("#titlePlayer").text("What your username ? (Player " + Game.getiCurrentUser() + ")")
            $("#sNamePlayer").val("");
            $("#sNamePlayer").attr("placeholder","Player " + Game.getiCurrentUser());
            $("#hPlayer").empty();
        }



    });
});