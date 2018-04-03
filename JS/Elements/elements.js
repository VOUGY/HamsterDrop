//Ce qui concerne les elements dynamiques qui seront integres au canvas, balle non comprise
var listLines = [[100,100,150,0],[200,100,200,23]];

function drawLines(listObj) {
    for(var obj in listObj){
        new drawLine(obj[0],obj[1],obj[2],obj[3]);
    }
}

function drawLine(startX, startY, length, tilt){
    this.startX = startX;
    this.startY = startY;
    this.length = length;
    this.tilt = tilt;

    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(startX+Math.cos(tilt)*length, startY+Math.sin(tilt)*length);
    ctx.stroke();
}
