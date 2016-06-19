var shapesArray = [];
var colorStore = [];
var numOfShapes = 50;
var backgroundColor = "#113151";

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(backgroundColor);
  
  for (var i = 0; i < 50; i++) {
    shapesArray[i] = new Shape(random(windowWidth), random(100));
  }
}

function draw() {
  background(backgroundColor);
  for (var i = 0; i < numOfShapes; i++) {
    shapesArray[i].create();
    shapesArray[i].fall();
  }
}



function mouseClicked() {
  var clickedIndex;
  for (var i = 0; i < numOfShapes; i++) {
    var ans = shapesArray[i].isClicked(mouseX, mouseY);
     if (ans === true) {
       clickedIndex = i;
     }
  }
  
  if (colorStore[0] === undefined ){
    colorStore[0] = clickedIndex;
  } else if (colorStore[1] === undefined) {
    colorStore[1] = clickedIndex;
  }
  
  if (colorStore[0] !== undefined && colorStore[1] !== undefined) {
    var color1 = shapesArray[colorStore[0]].getColor();
    var color2 = shapesArray[colorStore[1]].getColor();
    
    //CHECK TO SEE IF COLORS MATCH
    if (checkPair(color1, color2) === true) {
      alert("You win !!!");
      colorStore = [];
    } else {
      alert("You lose :-(");
      colorStore = [];
    }
  }
  
}

function checkPair(color1, color2) {
  if (color1 == color2){
    return true;
  } else {
    return false;
  }
}


