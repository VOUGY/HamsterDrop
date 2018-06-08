var div = document.getElementById('right');
var html = "<br/>";

var game = JSON.parse(localStorage.getItem(localStorage.key(0)));
var table = game.aPlayers;

for (var player = 0; player < table.length; player++) {
    var name = table[player].name;
    var hamster = table[player].idhamster;
    var ham = hamster.substr(0, 4);
    var avatar = ham + ".png";

    html += '<div class="container" style="margin-top: 20px"><img style="height: 45px; width: 47px" src="IMAGE/Avatars/'
        + avatar + '"/><text style="margin-left: 10px">' + name + '</text></div>';
}

div.innerHTML = html;