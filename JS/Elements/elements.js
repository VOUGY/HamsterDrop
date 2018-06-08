// Everything about the elements

// Define the escape room
var goal = [700, 580, 60, 40]; // [bottomLeftX, bottomLeftY, width, height]
var level = 0;

// Define lines and colors
var listLines = [
    [ //0:startX, 1:startY, 2:length, 3:tilt, 4:color
        // 0 BLACK 1 RED 2 BLUE 3 ORANGE 4 YELLOW 5 PINK
        [285,130,300,10,1], //LEVEL 1
        [570,180,480,62,2],
        [480,250,480,62,3],
        [0,300,150,80,4],
        [220,200,190,25,5]
    ],
    [
        [450,130,300,5,1], //LEVEL 2
        [170,200,200,15,2],
        [480,180,480,89,3],
        [0,300,150,80,4],
        [650,200,190,25,5]
    ],
    [
        [450,365,100,-25,1], //LEVEL 3
        [170,480,200,15,2],
        [650,200,145,100,3],
        [0,300,150,80,4],
        [650,200,190,25,5]
    ]
];
// initialise the list of lines that will be used for rebound detection
var listCalcLines = Array(listLines[level].length+3);

var colors = {
    0:"black",
    1:"red",
    2:"blue",
    3:"orange",
    4:"yellow",
    5:"pink",
};


function drawGoal() {
    ctx.fillStyle = "black";
    ctx.fillRect(goal[0], h - goal[3], goal[2], goal[3]);
    ctx.fillStyle = "purple";
    ctx.beginPath();
    var goalRoundRadius = goal[2] / 2;
    ctx.arc(goal[0] + goalRoundRadius, h - goal[3], goalRoundRadius, Math.PI, Math.PI*2, false);
    ctx.fill();
};

// Make line format for canvas. Will be use for rebound detection and drawlines()
function calcLines(){

    listCalcLines[0] = [0, 0, 0, h]; //add black line for left wall
    listCalcLines[1] = [0, h, w, h]; //add black line for bottom
    listCalcLines[2] = [w, 0, w, h]; //add black line for right wall

    var l = listLines[level].length;

    for(var i=0;i<l;i++){
        var startX = listLines[level][i][0];
        var startY = listLines[level][i][1];
        var length = listLines[level][i][2];
        var tilt = listLines[level][i][3] / 180 * Math.PI; // from deg to rad
        var endX = startX+Math.cos(tilt)*length;
        var endY = startY+Math.sin(tilt)*length;

        //from left to right line or from top to down
        if(endX > startX)
            listCalcLines[i+3] = [startX, startY, endX, endY]; //last one is the status of the ball position,
        //passed or not the half plan delimited by the line
        else if(endX < startX)
            listCalcLines[i+3] = [endX, endY, startX, startY];
        else {
            if (startX > endX)
                listCalcLines[i+3] = [startX, startY, endX, endY];
            else
                listCalcLines[i+3] = [endX, endY, startX, startY];
        }
    }
}

function drawLines_rev(level){

    level = level;
    for(var i=0;i<listLines[level].length;i++){
        var line = listLines[level][i];
        ctx.save();
        ctx.translate(line[0], line[1]);
        ctx.rotate(line[3]/180*Math.PI);
        ctx.strokeStyle = colors[line[4]];
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0,0);
        ctx.lineTo(line[2],0);
        ctx.stroke();
        ctx.restore();
    }
}


