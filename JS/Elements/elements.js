//Ce qui concerne les elements dynamiques qui seront integres au canvas, balle non comprise
// var startX, startY, length, tilt, endX, endY;
var listLines = [ //startX, startY, length, tilt
    // [100,150,150,1],
    [400,420,200,-0.5],
    // [460,400,200,0],
    // [200,200,150,-0.5]
];
var listRect = [ // startX, startY, length, width, tilt
    [300, 300, 250, 100, Math.PI/4]
];
var listCalcLines = Array(listLines.length);
var listCalcRect = Array(listRect.length);

function drawLines() {
    for(var i=0;i<listCalcLines.length;i++)
        drawLine(listCalcLines[i]);
}

function drawRects() {
    for(var i=0;i<listRect.length;i++)
        drawRect(listRect[i]);
}

function calcLines(){
    var l = listLines.length;

    for(var i=0;i<l;i++){
        var startX = listLines[i][0];
        var startY = listLines[i][1];
        var length = listLines[i][2];
        var tilt = listLines[i][3];
        var endX = startX+Math.cos(tilt)*length;
        var endY = startY+Math.sin(tilt)*length;

        //from left to right line or from top to down
        if(endX > startX)
            listCalcLines[i] = [startX, startY, endX, endY, 1]; //last one is the status of the ball position,
                                                                //passed or not the half plan delimited by the line
        else if(endX < startX)
            listCalcLines[i] = [endX, endY, startX, startY, 1];
        else {
            if (startX > endX)
                listCalcLines[i] = [startX, startY, endX, endY, 1];
            else
                listCalcLines[i] = [endX, endY, startX, startY, 1];
        }
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