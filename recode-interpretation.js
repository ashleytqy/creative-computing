//inspired by http://recodeproject.com/translation/genevieve-hoffman-direct-untitled-2-aaron-marcus
var count = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("black");
  var xPos = random(windowWidth);
  var yPos = random(windowHeight);
  var shapeLength = random(100);
  var randomAngle = random(360);
  frameRate(30);
}

function draw() {
  count ++;
  print(count);
  
  stroke("white");
  strokeWeight(mouseY * 10 / windowHeight);
  noFill();
  
  if (count % 3 === 0) {
      //square
    xPos = random(windowWidth);
    yPos = random(windowHeight);
    shapeLength = random(100);
    translate(xPos, yPos);
    randomAngle = random(360);
    rotate(randomAngle);
    rect(xPos, yPos, shapeLength, shapeLength);
    
  } else if (count % 3 == 1) {
      //circle
      xPos = random(windowWidth);
      yPos = random(windowHeight);
      shapeLength = random(100);
      ellipse(xPos, yPos, shapeLength, shapeLength);
      
  } else {
      //line
      translate(xPos, yPos);
      randomAngle = random(360);
      xPos = random(windowWidth);
      yPos = random(windowHeight);
      shapeLength = random(100);
      rotate(randomAngle);
      line(xPos, yPos, xPos + random(100), yPos + random(100));
  }
  
    if (count > 100) {
    count = 0;
    clear();
    frameRate(30);
    background("black");
    redraw();
  }
  
}