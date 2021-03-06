//Golbal variables
var ctx;        //Canvas object
 
var t;          //Tetrimino type
var x, y;       //Tetrimino position
var o;          //Tetrimino orientation
 
var grid;    //Game state grid
 
var timer;    //Game timer
 
var score;    //Player's score
var level;    //Current level
var timestep;    //Time between calls to gameStep()

var charxPos //Player X position
var charyPos //Player Y position
var charSize //Player Size
 
/************************************************
Initialize the drawing canvas
************************************************/
function initialize() {
  
    //Get the canvas context object from the body
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    
    //Initialize tetrimino variables
    t = 1 + Math.floor((Math.random()*7)); //Determine shape
    o = 0 + Math.floor((Math.random()*3)); //Determine orientation
    y = 18;                                //y axis spawn is always the same
    x = getXValue(t, o);                   //Determine x axis spawn based on shape and orientation
     
    //Create an empty game state grid
    grid = new Array(20);
    for(i = 0; i < 20; i++) {
        grid[i] = new Array(10);
        for(j = 0; j < 10; j++)
            grid[i][j] = 0;
    }
    
    //Draw the current tetrimino
    drawTetrimino(x,y,t,o,1);
    
    //Redraw the grid
    drawGrid();

    //Draw the player character
    drawChar(charxPos,charyPos,charSize,charSize);
    
    score = 0;
    level = 1;
    timestep = 1000;
    
    //Start the game timer
    clearInterval(timer);
    timer = setInterval(function(){gameStep()}, timestep);
}
 
 
/************************************************
Draws the current game state grid
************************************************/
function drawGrid() {
    
    //Clear the canvas
    ctx.clearRect(0,0,200,400);
    
    //Loop over each grid cell
    for(i = 0; i < 20; i++) {
        for(j = 0; j < 10; j++)
            drawBlock(j, i, grid[i][j]);
    }
}
 
/************************************************
 * Determines the initial x axis spawn value based
 * on the shape and orientation
 */
function getXValue(t, o) {
    if(t==1) { //I shape
        if(o==0) return 1 + Math.floor((Math.random()*6));
        else if(o==1) return 0 + Math.floor((Math.random()*8));
        else if(o==2) return 1 + Math.floor((Math.random()*6));
        else if(o==3) return 0 + Math.floor((Math.random()*9));
        else return 1 + Math.floor((Math.random()*6));
    } else if (t==2 || t==3 || t==5|| t==6 || t==7) { //J, L, S, T, or Z shape
        if(o==0) return 1 + Math.floor((Math.random()*6));
        else if(o==1) return 0 + Math.floor((Math.random()*8));
        else if(o==2) return 1 + Math.floor((Math.random()*6));
        else if(o==3) return 1 + Math.floor((Math.random()*7));
        else return 1 + Math.floor((Math.random()*6));
    } else if(t==4) { //O shape
        return 0 + Math.floor((Math.random()*8));
    } else return 0 + Math.floor((Math.random()*5)); //Random return value that will work with any shape and orientation
}

/************************************************
Draws the player character at the specified game coordinates
x = [^,^]
y = [^,^]
t = [^,^]
*************************************************/

function drawChar(charxPos,charyPos,charSize,charSize){
    //convert game coordinates to pixel coordinates
    charX = x*20;
    charY = (19-y)*20
    charSize = 15;
    
    //set the fill color for drawing commands
    cxt.fillStyle="FF0000";
    //create a filled rectalgle
    cxt.fillRect(charX,charY,charSize,charSize);

}


/************************************************
Draws a block at the specified game coordinate
x = [0,9]   x-coordinate
y = [0,19]  y-coordinate
t = [0,7]   block type
************************************************/



function drawBlock(x, y, t) {
    
    //Check if a block needs to be drawn
    if(t > 0) {
    
        //Get the block color
        var c;
        if(t == 1)        //I type
            c = 180;    //Cyan
        else if(t == 2)    //J type
            c = 240;    //Blue
        else if(t == 3)    //L type
            c = 40;        //Orange
        else if(t == 4)    //O type
            c = 60;        //Yellow
        else if(t == 5) //S type
            c = 120;    //Green
        else if(t == 6) //T type
            c = 280;    //Purple
        else            //Z type
            c = 0;        //Red
    
        //Convert game coordinaes to pixel coordinates
        pixelX = x*20;
        pixelY = (19-y)*20;
          
          
        /**** Draw the center part of the block ****/
          
        //Set the fill color using the supplied color
        ctx.fillStyle = "hsl(" + c + ",100%,50%)";
          
        //Create a filled rectangle
        ctx.fillRect(pixelX+2,pixelY+2,16,16);
        
        
        /**** Draw the top part of the block ****/
          
        //Set the fill color slightly lighter
        ctx.fillStyle = "hsl(" + c + ",100%,70%)";
          
        //Create the top polygon and fill it
        ctx.beginPath();
        ctx.moveTo(pixelX,pixelY);
        ctx.lineTo(pixelX+20,pixelY);
        ctx.lineTo(pixelX+18,pixelY+2);
        ctx.lineTo(pixelX+2,pixelY+2);
        ctx.fill();
          
          
        /**** Draw the sides of the block ****/
          
        //Set the fill color slightly darker
        ctx.fillStyle = "hsl(" + c + ",100%,40%)";
          
        //Create the left polygon and fill it
        ctx.beginPath();
        ctx.moveTo(pixelX,pixelY);
        ctx.lineTo(pixelX,pixelY+20);
        ctx.lineTo(pixelX+2,pixelY+18);
        ctx.lineTo(pixelX+2,pixelY+2);
        ctx.fill();
          
        //Create the right polygon and fill it
        ctx.beginPath();
        ctx.moveTo(pixelX+20,pixelY);
        ctx.lineTo(pixelX+20,pixelY+20);
        ctx.lineTo(pixelX+18,pixelY+18);
        ctx.lineTo(pixelX+18,pixelY+2);
        ctx.fill();
          
          
        /**** Draw the bottom part of the block ****/
          
        //Set the fill color much darker
        ctx.fillStyle = "hsl(" + c + ",100%,30%)";
          
        //Create the bottom polygon and fill it
        ctx.beginPath();
        ctx.moveTo(pixelX,pixelY+20);
        ctx.lineTo(pixelX+20,pixelY+20);
        ctx.lineTo(pixelX+18,pixelY+18);
        ctx.lineTo(pixelX+2,pixelY+18);
        ctx.fill();
    }
}
  
/*************************************************
Draws a tetrimino at the specified game coordinate
with the specified orientation
x = [0,9]   x-coordinate
y = [0,19]  y-coordinate
t = [1,7]   tetrimino type
o = [0,3]   orientation
d = [-1,1]    test, erase, or draw
*************************************************/
function drawTetrimino(x,y,t,o,d) {
 
    //Determine the value to send to setGrid
    c = -1;
    if(d >= 0) c = t*d;
    
    //Initialize validity test
    valid = true;
 
    /**** Pick the appropriate tetrimino type ****/
    if(t == 1) { //I Type
          
        //Get orientation
        if(o == 0) {
            valid = valid && setGrid(x-1,y,c);
            valid = valid && setGrid(x,y,c);
            valid = valid && setGrid(x+1,y,c);
            valid = valid && setGrid(x+2,y,c);
        }
        else if(o == 1) {
            valid = valid && setGrid(x+1,y+1,c);
            valid = valid && setGrid(x+1,y,c);
            valid = valid && setGrid(x+1,y-1,c);
            valid = valid && setGrid(x+1,y-2,c);
        }
        else if(o == 2) {
            valid = valid && setGrid(x-1,y-1,c);
            valid = valid && setGrid(x,y-1,c);
            valid = valid && setGrid(x+1,y-1,c);
            valid = valid && setGrid(x+2,y-1,c);
        }
        else if(o == 3) {
            valid = valid && setGrid(x,y+1,c);
            valid = valid && setGrid(x,y,c);
            valid = valid && setGrid(x,y-1,c);
            valid = valid && setGrid(x,y-2,c);
        }
    }
    if(t == 2) { //J Type
          
        //Get orientation
        if(o == 0) {
            valid = valid && setGrid(x-1,y+1,c);
            valid = valid && setGrid(x-1,y,c);
            valid = valid && setGrid(x,y,c);
            valid = valid && setGrid(x+1,y,c);
        }
        else if(o == 1) {
            valid = valid && setGrid(x+1,y+1,c);
            valid = valid && setGrid(x,y+1,c);
            valid = valid && setGrid(x,y,c);
            valid = valid && setGrid(x,y-1,c);
        }
        else if(o == 2) {
            valid = valid && setGrid(x-1,y,c);
            valid = valid && setGrid(x,y,c);
            valid = valid && setGrid(x+1,y,c);
            valid = valid && setGrid(x+1,y-1,c);
        }
        else if(o == 3) {
            valid = valid && setGrid(x,y+1,c);
            valid = valid && setGrid(x,y,c);
            valid = valid && setGrid(x,y-1,c);
            valid = valid && setGrid(x-1,y-1,c);
        }
    }
    if(t == 3) { //L Type
          
        //Get orientation
        if(o == 0) {
            valid = valid && setGrid(x-1,y,c);
            valid = valid && setGrid(x,y,c);
            valid = valid && setGrid(x+1,y,c);
            valid = valid && setGrid(x+1,y+1,c);
        }
        else if(o == 1) {
            valid = valid && setGrid(x,y+1,c);
            valid = valid && setGrid(x,y,c);
            valid = valid && setGrid(x,y-1,c);
            valid = valid && setGrid(x+1,y-1,c);
        }
        else if(o == 2) {
            valid = valid && setGrid(x-1,y-1,c);
            valid = valid && setGrid(x-1,y,c);
            valid = valid && setGrid(x,y,c);
            valid = valid && setGrid(x+1,y,c);
        }
        else if(o == 3) {
            valid = valid && setGrid(x-1,y+1,c);
            valid = valid && setGrid(x,y+1,c);
            valid = valid && setGrid(x,y,c);
            valid = valid && setGrid(x,y-1,c);
        }
    }
    if(t == 4) { //O Type
          
        //Orientation doesn’t matter
        valid = valid && setGrid(x,y,c);
        valid = valid && setGrid(x+1,y,c);
        valid = valid && setGrid(x,y+1,c);
        valid = valid && setGrid(x+1,y+1,c);
    }
    if(t == 5) { //S Type
         
        //Get orientation
        if(o == 0) {
            valid = valid && setGrid(x-1,y,c);
            valid = valid && setGrid(x,y,c);
            valid = valid && setGrid(x,y+1,c);
            valid = valid && setGrid(x+1,y+1,c);
        }
        else if(o == 1) {
            valid = valid && setGrid(x,y+1,c);
            valid = valid && setGrid(x,y,c);
            valid = valid && setGrid(x+1,y,c);
            valid = valid && setGrid(x+1,y-1,c);
        }
        else if(o == 2) {
            valid = valid && setGrid(x-1,y-1,c);
            valid = valid && setGrid(x,y-1,c);
            valid = valid && setGrid(x,y,c);
            valid = valid && setGrid(x+1,y,c);
        }
        else if(o == 3) {
            valid = valid && setGrid(x-1,y+1,c);
            valid = valid && setGrid(x-1,y,c);
            valid = valid && setGrid(x,y,c);
            valid = valid && setGrid(x,y-1,c);
        }
    }
    if(t == 6) { //T Type
          
        //Get orientation
        if(o == 0) {
            valid = valid && setGrid(x-1,y,c);
            valid = valid && setGrid(x,y,c);
            valid = valid && setGrid(x+1,y,c);
            valid = valid && setGrid(x,y+1,c);
        }
        else if(o == 1) {
            valid = valid && setGrid(x,y+1,c);
            valid = valid && setGrid(x,y,c);
            valid = valid && setGrid(x,y-1,c);
            valid = valid && setGrid(x+1,y,c);
        }
        else if(o == 2) {
            valid = valid && setGrid(x-1,y,c);
            valid = valid && setGrid(x,y,c);
            valid = valid && setGrid(x+1,y,c);
            valid = valid && setGrid(x,y-1,c);
        }
        else if(o == 3) {
            valid = valid && setGrid(x,y+1,c);
            valid = valid && setGrid(x,y,c);
            valid = valid && setGrid(x,y-1,c);
            valid = valid && setGrid(x-1,y,c);
        }
    }
    if(t == 7) { //Z Type
          
        //Get orientation
        if(o == 0) {
            valid = valid && setGrid(x-1,y+1,c);
            valid = valid && setGrid(x,y+1,c);
            valid = valid && setGrid(x,y,c);
            valid = valid && setGrid(x+1,y,c);
        }
        else if(o == 1) {
            valid = valid && setGrid(x+1,y+1,c);
            valid = valid && setGrid(x+1,y,c);
            valid = valid && setGrid(x,y,c);
            valid = valid && setGrid(x,y-1,c);
        }
        else if(o == 2) {
            valid = valid && setGrid(x-1,y,c);
            valid = valid && setGrid(x,y,c);
            valid = valid && setGrid(x,y-1,c);
            valid = valid && setGrid(x+1,y-1,c);
       }
        else if(o == 3) {
            valid = valid && setGrid(x,y+1,c);
            valid = valid && setGrid(x,y,c);
            valid = valid && setGrid(x-1,y,c);
            valid = valid && setGrid(x-1,y-1,c);
        }
    }
    
    return valid;
}
 
 
/*************************************************
Sets a grid cell in the game state grid
x = [0,9]   x-coordinate
y = [0,19]  y-coordinate
t = [-1,7]  test or block type
*************************************************/
function setGrid(x, y, t) {
    
    //Check if point is in range
    if(x >= 0 && x < 10 && y >= 0 && y < 20) {
        
        //Return test result if testing
        if(t < 0) return grid[y][x] == 0;
        
        //Otherwise assign block type to the grid
        grid[y][x] = t;
        return true;
    }
    return false;
}
 
 
/*************************************************
Responds to a key press event
*************************************************/
function keyDown(e) {
    //a = 65
    //s = 83
    //d = 68
    //w = 87
    //u arrow = 38
    //d arrow = 40
    //l arrow = 37
    //r a.rrow = 39
    //space = 32
    if(e.keyCode == 37) { //Left arrow
        drawTetrimino(x,y,t,o,0);  //Erase the current tetrimino
        x2 = x - 1;
        if(drawTetrimino(x2,y,t,o,-1)) //Check if valid
            x = x2;
    }
    else if(e.keyCode == 38) { //Up arrow
        drawTetrimino(x,y,t,o,0);  //Erase the current tetrimino
        o2 = (o + 1) % 4;
        if(drawTetrimino(x,y,t,o2,-1)) //Check if valid
            o = o2;
    }
    else if(e.keyCode == 39) { //Right arrow
        drawTetrimino(x,y,t,o,0);  //Erase the current tetrimino
        x2 = x + 1;
        if(drawTetrimino(x2,y,t,o,-1)) //Check if valid
            x = x2;
    }
    else if(e.keyCode == 40) { //Down arrow
        drawTetrimino(x,y,t,o,0);  //Erase the current tetrimino
        y2 = y - 1;
        if(drawTetrimino(x,y2,t,o,-1)) //Check if valid
            y = y2;
    }
    else if(e.keyCode == 32) { //Space-bar
        drawTetrimino(x,y,t,o,0);  //Erase the current tetrimino
        
        //Move down until invalid
        while(drawTetrimino(x,y-1,t,o,-1))
            y -= 1;
            
        gameStep();
    
        //Move the Game Character
    
        if(/*e.keyCode == 39||*/e.keyCode==68){
            charxPos+=5;
        }
        if(/*e.keyCode == 37||*/e.keyCode==65){
            charxPos-=5
        }
        if(/*e.keyCode == 38||*/e.keyCode==87){
            charyPos-=5
        }
        if(/*e.keyCode == 40||*/e.keyCode==83){
            charyPos+=5
        }
    context.rect(charxPos,charyPos, 15,15);
    context.stroke();

    }
     
    //Draw the current tetrimino
    drawTetrimino(x,y,t,o,1);
    
    //Redraw the grid
    drawGrid();
}
 
 
/*************************************************
Updates the game state at regular intervals
*************************************************/
function gameStep() {
 
    //Erase the current tetrimino
    drawTetrimino(x,y,t,o,0);  
    
    //Check if the tetrimino can be dropped 1 block
    y2 = y - 1;
    if(drawTetrimino(x,y2,t,o,-1))
        y = y2;
    else {
    
        //Redraw last tetrimino
        drawTetrimino(x,y,t,o,1);
    
        //Check if any lines are complete
        checkLines();
    
        //Create a new tetrimino 
        t2 = 1 + Math.floor((Math.random()*7)); //Determine shape
        o2 = 0 + Math.floor((Math.random()*3)); //Determine orientation
        y2 = 18;                                //y axis spawn is always the same
        x2 = getXValue(t2, o2);                   //Determine x axis spawn based on shape and orientation
        
        //Check if valid
        if(drawTetrimino(x2,y2,t2,o2,-1)) {
            t = t2;
            x = x2;
            y = y2;
            o = o2;
        }
        else {
            alert("Game Over" + " t2=" + t2 + " o2=" + o2 + " x2=" + x2);
            initialize();
            return;
        }
        
    }
    
    //Draw the current tetrimino
    drawTetrimino(x,y,t,o,1);
    
    //Redraw the grid
    drawGrid();
}
 
 
/*************************************************
Removes completed lines from the grid
*************************************************/
function checkLines() {
 
    //Loop over each line in the grid
    for(i = 0; i < 20; i++) {
    
        //Check if the line is full
        full = true;
        for(j = 0; j < 10; j++)
            full = full && (grid[i][j] > 0);
            
        if(full) {
        
            //Update score
            score++;
            
            //Check if ready for the next level
            if(score >= level*10) {
                level++;
                
                //Update the timer with a shorter timestep
                timestep *= 0.8;
                clearInterval(timer);
                timer = setInterval(function(){gameStep()}, timestep);
            }
        
            //Update score and level display
            document.getElementById("score").innerHTML = "Level " + level + "   Score: " + score;
        
            //Loop over the remaining lines
            for(ii = i; ii < 19; ii++) {
                
                //Copy each line from the line above
                for(j = 0; j < 10; j++)
                    grid[ii][j] = grid[ii+1][j];
            }
            
            //Make sure the top line is clear
            for(j = 0; j < 10; j++)
                grid[19][j] = 0;
                
            //Repeat the check for this line
            i--;
        }
    }
}