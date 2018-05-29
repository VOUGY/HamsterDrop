//Ce qui concerne les elements dynamiques qui seront integres au canvas, balle non comprise
// var startX, startY, length, tilt, endX, endY;
var listLines = [ //0:startX, 1:startY, 2:length, 3:tilt, 4:color
    [525,320,140,-1,1],
    [520,400,600,-0.35,2],
    [0,300,280,0,6],
    [0,300,200,1,6],
    [600,200,400,0.13,6]
];

var colors = {
    1:"red",
    2:"blue",
    3:"orange",
    4:"yellow",
    5:"pink",
    6:"black"
};
var goal = [700, 580, 50, 20];
var listRect = [ // startX, startY, length, width, tilt
    [300, 300, 250, 100, Math.PI/4]
];
var listCalcLines = Array(listLines.length+3);
var listCalcRect = Array(listRect.length);

function drawLines() {
    for(var i=0;i<listCalcLines.length;i++)
        drawLine(listCalcLines[i]);
};

function drawRects() {
    for(var i=0;i<listRect.length;i++)
        drawRect(listRect[i]);
};
function drawGoal() {
    ctx.fillStyle = "blue";
    ctx.fillRect(goal[0], goal[1], goal[2], goal[3]);
};

function calcLines(){
    var l = listLines.length;
    listCalcLines[0] = [0, h, w, h, 1]; //add line for bottom
    listCalcLines[1] = [0, 0, 0, h, 1]; //add line for left wall
    listCalcLines[2] = [w, 0, w, h, 1]; //add line for right wall

    for(var i=0;i<l;i++){
        var startX = listLines[i][0];
        var startY = listLines[i][1];
        var length = listLines[i][2];
        var tilt = listLines[i][3];
        var endX = startX+Math.cos(tilt)*length;
        var endY = startY+Math.sin(tilt)*length;

        //from left to right line or from top to down
        if(endX > startX)
            listCalcLines[i+3] = [startX, startY, endX, endY, 1]; //last one is the status of the ball position,
                                                                  //passed or not the half plan delimited by the line
        else if(endX < startX)
            listCalcLines[i+3] = [endX, endY, startX, startY, 1];
        else {
            if (startX > endX)
                listCalcLines[i+3] = [startX, startY, endX, endY, 1];
            else
                listCalcLines[i+3] = [endX, endY, startX, startY, 1];
        }
    }

}

function calcLines_rev(){
    // var calcStX, calcStY, calcEndX, calcEnY;
    var i;

    if(Math.abs(line[3]) < Math.PI/2 || line[3] === Math.PI/2){
        listCalcLines[i][0] = line[0];
        listCalcLines[i][1] = line[1];
        listCalcLines[i][2] = line[0] + Math.cos(line[3]) * line[2];
        listCalcLines[i][3] = line[1] + Math.sin(line[3]) * line[2];
    }
    else if(Math.abs(line[3]) > Math.PI/2 || Line[3] === -Math.PI/2){
        listCalcLines[i][0] = line[0] + Math.cos(line[3]) * line[2];
        listCalcLines[i][1] = line[1] + Math.sin(line[3]) * line[2];
        listCalcLines[i][2] = line[0];
        listCalcLines[i][3] = line[1];
    }
}

function calcRect() {
    var l = listRect.length;

    for(var i=0;i<l;i++){
        var r = listRect[i];
        var startX = r[0];
        var startY = r[1];
        var length = r[2];
        var width = r[3];
        var tilt = r[4];
        var endX = startX + length;
        var endY = startY + width;

        listCalcRect[i] = [startX, startY, length, width];
    }
}


function drawLine(line){
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(line[0],line[1]);
    ctx.lineTo(line[2], line[3]);
    ctx.stroke();
}

function drawRect(rect) {
    ctx.save();
    ctx.translate(rect[0], rect[1]);
    ctx.rotate(rect[4]);
    var texture = new Image();
    texture.src = "IMAGE/GameWindow/wood.jpg";
    var pat = ctx.createPattern(texture,"repeat");
    ctx.rect(0, 0, rect[2], rect[3]);
    ctx.fillStyle = pat;
    ctx.fill();
    ctx.restore();
}

function drawLines_rev(){
    for(var i=0;i<listLines.length;i++){
        var line = listLines[i];
        ctx.save();
        ctx.translate(line[0], line[1]);
        ctx.rotate(line[3]);
        ctx.strokeStyle = colors[line[4]];
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(line[2],0);
        ctx.stroke();
        ctx.restore();
    }
}