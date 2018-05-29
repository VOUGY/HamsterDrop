var ctx;
var x = 100;
var y = 100;

var dx = 5;
var dy = 5;

var clicked = false; //check that canvas hasn't been clicked yet

var canvas = document.getElementById("myCanvas");
ctx = canvas.getContext('2d');

function  getMousePos(canvas, evt) { // source https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
    var rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

    return {
        x: (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
}

//redraw ball based on position of cursor
function selectDropSpot(e) {

	//clear zone in order to redraw new shape
	ctx.clearRect(0,0,440,550);
	ctx.beginPath();

	ctx.fillStyle="#0000ff";

	var pos = getMousePos(canvas, e);

	ctx.arc(pos.x, y, 20,0,Math.PI*2,true);

	ctx.closePath();
	ctx.fill();

	//get x mouse position
	x = pos.x;

}
function ballDrop(pos) {

	canvas.onmousemove = null; //cancel listener that selects drop spot

	x = pos.x;

	canvas.onclick = null;
	//draw ball
	setInterval(function() {

        ctx.clearRect(0,0,440,550);
        ctx.beginPath();
        //define color of fill
        ctx.fillStyle="#0000ff";

		ctx.arc(x,y,20,0,Math.PI*2,true);

        ctx.closePath();
        ctx.fill();

        if(x<0 || x>440)
            dx = -dx;

        if(y<0 || y>550)
            dy = -dy;

        y+=dy;

    }, 5);

}

canvas.addEventListener('click', function(e){  //on click, let the ball fall down
	if (clicked == false) {
	clicked = true;
	ballDrop(getMousePos(canvas, e));
	}
}, true);
