let ctx;
let x = 100;
let y = 100;

let dx = 5;
let dy = 5;

let canvas = document.getElementById("myCanvas");
ctx = canvas.getContext('2d');

window.onload = function() {
    if (canvas.getContext)
        let selectDrop = setInterval(selectDropSpot, 1500);
	
}

//redraw ball based on position of cursor
function selectDropSpot(e) {

	//clear zone in order to redraw new shape
	ctx.clearRect(0,0,440,550);
	ctx.beginPath();

	ctx.fillStyle="#0000ff";

	ctx.arc(e.clientX-400, y, 20,0,Math.PI*2,true);

	ctx.closePath();
	ctx.fill();

	//get x mouse position
	x = e.clientX-400;

}

function ballDrop() {

	canvas.onmousemove = null; //cancel listener that selects drop spot

	ctx.clearRect(0,0,440,550);
	ctx.beginPath();
	//define color of fill
	ctx.fillStyle="#0000ff";

	//draw ball
	ctx.arc(x,y,20,0,Math.PI*2,true);

	ctx.closePath();
	ctx.fill();

	if(x<0 || x>440)
		dx = -dx;

	if(y<0 || y>550)
		dy = -dy;

	y+=dy;

}

canvas.addEventListener('click', function(){  //on click, let the ball fall down

	setInterval(ballDrop,5);
	clearInterval(selectDrop);
	
}, false);
