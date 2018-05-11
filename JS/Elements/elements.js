//Ce qui concerne les elements dynamiques qui seront integres au canvas, balle non comprise
var startX, startY, length, tilt, endX, endY;
var listLines = [
    // [100,150,150,1],
    [460,500,200,0],
    [460,400,200,0],
    // [200,200,150,-0.5]
];
var listCalcLines = Array(listLines.length);

function drawLines() {
    for(var i=0;i<listCalcLines.length;i++){
        startX = listCalcLines[i][0];
        startY = listCalcLines[i][1];
        endX = listCalcLines[i][2];
        endY = listCalcLines[i][3];
        drawLine();
    }
}

function calcLines(){
    var listLinesLength = listLines.length;

    for(var i=0;i<listLinesLength;i++){
        startX = listLines[i][0];
        startY = listLines[i][1];
        length = listLines[i][2];
        tilt = listLines[i][3];
        endX = startX+Math.cos(tilt)*length;
        endY = startY+Math.sin(tilt)*length;
        if(endX>=startX)
            listCalcLines[i] = [startX, startY, endX, endY];
        else if(endX<startX)
            listCalcLines[i] = [endX, endY, startX, startY];
    }
}

function drawLine(){
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
}
function calculateContactY(){
    contactY = startY+Math.sin(tilt)*length;
    return contactY;
}
