/*

>> webcam paintbrush <<
1. click the area you decide to the tip fo the brush
2. re-click to redraw

*/

var video;
var prevXPos;
var prevYPos;
//to-do: map 'size' to something more meaningful and not mouseX;

//a variable for the color we are searching for.
var trackColor;
//arrays to store elements that need to be redrawn every frame
var colorArray = [];

function setup() {
  createCanvas(480, 360);
  video = createCapture(VIDEO); //capture the video
  video.size(480, 360); //camera size
  video.hide();

  //start off tracking for red
  trackColor = [255, 0, 0];
}

function draw() {
  background(255);
  //for the mirror effect, to make the video look more natural
  translate(width, 0);
  scale(-1.0, 1.0);
  // draw the video to canvas
  image(video, 0, 0);
  video.loadPixels();

  // Before we begin searching, the "world record" for closest color is set to a high number that is easy for the first pixel to beat.
  var worldRecord = 500;

  // XY coordinate of closest color
  var closestX = 0;
  var closestY = 0;

  //loop through every pixel in the video
  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {

      var loc = (x + y * video.width) * 4;

      // The functions red(), green(), and blue() pull out the three color components from a pixel.
      var r1 = video.pixels[loc];
      var g1 = video.pixels[loc + 1];
      var b1 = video.pixels[loc + 2];

      var r2 = trackColor[0];
      var g2 = trackColor[1];
      var b2 = trackColor[2];

      // the dist( ) function compar the current color with the color we are tracking.
      var d = dist(r1, g1, b1, r2, g2, b2);

      // If current color is more similar to tracked color than
      // closest color, save current location and current difference
      if (d < worldRecord) {
        worldRecord = d;
        closestX = x;
        closestY = y;
      }
    }
  }


  if (worldRecord < 30) {
  // && abs(closestX - prevXPos) <= 100 && abs(closestY - prevYPos) <= 100
    // Draw a circle at the tracked pixel
    // Must be close to previous location
    fill(trackColor);
    stroke("black");
    strokeWeight(7);
    ellipse(closestX, closestY, 16, 16);

    var size = 10;
    //add new X and Y to the colorArray
    colorArray.push(closestX, closestY, size, size, trackColor);
    //update prevXPos and prevYPos
    prevXPos = closestX;
    prevYPos = closestY;
  }

  paint();

}


function mousePressed() {
  //clear the previous selection
  colorArray = [];
  //save color where the mouse is clicked in trackColor variable
  trackColor = video.get((width - mouseX), mouseY);
  fill(trackColor);
  stroke("black");
  strokeWeight(7);
  ellipse(mouseX, mouseY, 16, 16);
  noStroke();

  // console.log(mouseX + "\t" + (width - mouseX) + " " + width);
  console.log(trackColor);
  prevXPos = mouseX;
  prevYPos = mouseY;
}

function paint() {
  for (var i = 0; i < colorArray.length; i += 5) {

    var colorToPaint = colorArray[i + 4];
    noStroke();
    fill(colorToPaint);
    //draw ellipse at closestX and closestY
    ellipse(colorArray[i], colorArray[i + 1], colorArray[i + 2], colorArray[i + 3]);
    noFill();

    if (i - 3 <= colorArray.length) {
      strokeWeight(5);
      stroke(colorToPaint);
      //draw line from prevX and prevY to closestX and closestY
      line(colorArray[i], colorArray[i + 1], colorArray[i + 5], colorArray[i + 6]);
      noStroke();
    }

  }
}
