//Tout ce qui concerne les elements dynamiques qui seront integres au canvas, balle non comprise


function drawLines(startX, startY, length, tilt){
    var startX = startX;
    var startY = startY;
    var length = length;
    var tilt = tilt;
    var elementDefaultColor = "blue";

    ctx.strokeStyle = elementDefaultColor;
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    // ctx.lineTo(200, 200);

    ctx.lineTo(Math.cos(tilt)*length, Math.sin(tilt)*length);
    ctx.stroke();
}
