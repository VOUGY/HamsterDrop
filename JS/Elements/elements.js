//Ce qui concerne les elements dynamiques qui seront integres au canvas, balle non comprise
// var startX, startY, length, tilt, endX, endY;
var listLines = [[100,100,150,0],[400,300,200,Math.PI]];
var listCalcLines = Array(listLines.length);

function drawLines() {
    var listCalcLinesLength = listCalcLines.length;
    for(var i=0;i<listCalcLinesLength;i++)
        new drawLine(listCalcLines[i][0],listCalcLines[i][1],listCalcLines[i][2],listCalcLines[i][3]);
}

function calcLines(){
    var listLinesLength = listLines.length;
    var startX, startY, length, tilt, endX, endY;

    for(var i=0;i<listLinesLength;i++){
        console.log(listLines[0][1]);

        startX = listLines[i][0];
        startY = listLines[i][1];
        length = listLines[i][2];
        tilt = listLines[i][3];
        endX = startX+Math.cos(tilt)*length;

        endY = startY+Math.sin(tilt)*length;

        listCalcLines[i] = [startX, startY, endX, endY];
    }
}

function drawLine(x1, y1, x2, y2){
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function getYfromX(x){

}
