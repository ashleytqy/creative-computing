var video;
var colorArray = [];
var prevXPos;
var prevYPos;

// A variable for the color we are searching for.
var trackColor;

function setup() {
  createCanvas(windowWidth, windowHeight);
  video = createCapture(VIDEO);
  video.size(320 * 1.5, 240 * 1.5);
  video.hide();

  // Start off tracking for red
  trackColor = [255, 0, 0];
}

function draw() {

  // Draw the video
  image(video, 0, 0);

  // We are going to look at the video's pixels
  video.loadPixels();

  // Before we begin searching, the "world record" for closest color is set to a high number that is easy for the first pixel to beat.
  var worldRecord = 500;

  // XY coordinate of closest color
  var closestX = 0;
  var closestY = 0;

  for (var y = 0; y < video.height; y++) {
    for (var x = 0; x < video.width; x++) {

      var loc = (x + y * video.width) * 4;
      //var loc = (x + y * video.width) * 4;
      // The functions red(), green(), and blue() pull out the three color components from a pixel.
      var r1 = video.pixels[loc];
      var g1 = video.pixels[loc + 1];
      var b1 = video.pixels[loc + 2];

      var r2 = trackColor[0];
      var g2 = trackColor[1];
      var b2 = trackColor[2];

      // Using euclidean distance to compare colors
      var d = dist(r1, g1, b1, r2, g2, b2); // We are using the dist( ) function to compare the current color with the color we are tracking.

      // If current color is more similar to tracked color than
      // closest color, save current location and current difference
      if (d < worldRecord) {
        worldRecord = d;
        closestX = x;
        closestY = y;
      }
    }
  }


  if (worldRecord < 20 && abs(closestX - prevXPos) <= 100 && abs(closestY - prevYPos) <= 100) {
    // Draw a circle at the tracked pixel
    // Must be close to previous location
    fill(trackColor);
    strokeWeight(4.0);
    stroke(0);
    ellipse(closestX, closestY, 16, 16);
    var size = map(mouseX, 0, width, 0, 50);
    colorArray.push(closestX, closestY, size, size);
    //update prevXPos and prevYPos
    prevXPos = closestX;
    prevYPos = closestY;
  }

  paint();
}


function mousePressed() {
  // Save color where the mouse is clicked in trackColor variable
  trackColor = video.get(mouseX, mouseY);
  console.log(trackColor);
  prevXPos = mouseX;
  prevYPos = mouseY;
}

function paint() {
  for (var i = 0; i < colorArray.length; i += 4) {
    noStroke();
    ellipse(colorArray[i], colorArray[i + 1], colorArray[i + 2], colorArray[i + 3]);
  }
}