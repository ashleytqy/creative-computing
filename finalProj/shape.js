function shape(xPos, yPos, shapeWidth) {

  //ATTRIBUTES
  this.x = xPos;
  this.y = yPos;
  this.length = shapeWidth * .75;
  this.shapeColor = randomColor({
    luminosity: 'light'
  });

  //METHODS
  this.create = function() {
    noStroke();
    fill(this.shapeColor);
    ellipse(this.x, this.y, this.length, this.length);
  }

  this.update = function(newLength) {
    this.length = newLength * .75;
    noStroke();
    fill(this.shapeColor);
    ellipse(this.x, this.y, this.length, this.length);
  }
  
  this.setColor = function(newColor) {
    this.shapeColor = newColor;
  }
  
  this.getXPos = function(){
    return this.x;
  } 
  
  this.getRadius = function(){
    return this.length / 2;
  }
}