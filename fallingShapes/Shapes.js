function Shape(xPos, yPos) {
  var isWithinCircle = "false";
  var colorArray = ["#ffcbea", "#ebd3ff", "#ffd8da", "#d1a0c0", "#e3c3de", "#fbbfef", "#f4889a"];

  //ATTRIBUTES
  this.x = xPos;
  this.y = yPos;
  this.sideLength = random(10, 50);
  this.shapeColor = colorArray[floor(random(colorArray.length))];

  //METHODS
  this.create = function() {
    fill(this.shapeColor);
    noStroke();
    ellipse(this.x, this.y, this.sideLength, this.sideLength);
  }

  this.fall = function() {
    this.y += this.sideLength * 0.05;
  }
  
  this.getColor = function() {
    return this.shapeColor;
  }
  
  this.getYPos = function(){
    return this.y;
  }

  this.isClicked = function(tempX, tempY) {
  
      this.locX = tempX;
      this.locY = tempY;
  
      var d = dist(this.locX, this.locY, this.x, this.y);
      if (d < this.sideLength / 2) {
        this.isWithinCircle = true;
      } else {
        this.isWithinCircle = false;
      }
      return this.isWithinCircle;
  
    }
}
