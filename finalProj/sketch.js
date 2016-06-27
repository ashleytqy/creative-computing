var serial; // variable to hold the serialport library
var portName = '/dev/cu.usbmodem1421'; // use your serial port name
var inByte = 0;
var amp = 0;
var mode = 1;
var bgColor = "#212121";
var shapesArray = [];
var energyArray = ["bass", "lowMid", "mid", "highMid", "treble"]
var strokeCol = randomColor({
  luminosity: 'light'
});

function preload() {
  sound = loadSound('songs/song2.mp3');
}


function setup() {
  //CANVAS
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.mouseClicked(togglePlay);
  background(bgColor);
  fft = new p5.FFT(0, 1024);


  //PORT
  serial = new p5.SerialPort();
  serial.on('connected', serverConnected);
  serial.on('open', portOpen);
  serial.on('data', serialEvent);
  serial.on('error', serialError);
  serial.on('close', portClose);
  serial.open(portName);
}

function draw() {

  background(bgColor);
  //circleMode();
  if (mode == 1) {
    circleMode();
  } else if (mode == 2) {
    waveMode();
  } else {
    circleMode();
    waveMode();
  }


  // amp = 0.8; //MAP AMP TO POTENTIOMETER OR STH!!! LIGHT??
  // sound.amp(amp);
}


//SOUND FUNCTIONS
function togglePlay() {
  //distance is far > stop; if close > play
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}

function circleMode() {
  //initializing the array
  if (shapesArray.length == 0) {
    var xPos = width / 6;
    var yPos = height / 2;

    for (var i = 0; i < 5; i++) {
      shapesArray[i] = new shape(xPos, yPos, 50);
      xPos += width / 6;
    }
  }

  fft.analyze();
  for (var i = 0; i < 5; i++) {
    shapesArray[i].create();
    shapesArray[i].update(fft.getEnergy(energyArray[i]));
  }

  if (checkOverlap() == true) {
    bgColor = randomColor({luminosity: 'dark'});
  }
}

function waveMode() {
  var waveform = fft.waveform();
  noFill();
  beginShape();
  stroke(strokeCol);
  strokeWeight(2.5);
  for (var i = 0; i < waveform.length; i++) {
    var x = map(i, 0, waveform.length, 0, width);
    var y = map(waveform[i], -1, 1, 0, height);

    if (waveform[i] > 0.5 && waveform[i] < 0.60) {
      strokeCol = randomColor({
        luminosity: 'light'
      });
    } else if (waveform[i] >= 0.60) {
      strokeCol = "white";
    }

    vertex(x, y);
  }
  endShape();
}

function toggleMode() {
  if (mode == 1) {
    mode = 2;
  } else if (mode == 2) {
    mode = 3;
  } else {
    mode = 1;
  }
}

function reverbMode() {
  reverb = new p5.Reverb();
  sound.disconnect(); // so we'll only hear reverb...
  var input = map(mouseX, 0, width, 0, 3);
  reverb.process(sound, 3, input);
  print(input);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    for (var i = 0; i < shapesArray.length; i++) {
      var newColor = randomColor({
        luminosity: 'light'
      });
      shapesArray[i].setColor(newColor);
    }
  }

  if (keyCode === RIGHT_ARROW) {
    toggleMode();
  }
}

function checkOverlap() {
  //check for all except last circle
  for (var i = 0; i < shapesArray.length - 1; i++) {
    var rightEdge = shapesArray[i].getXPos() + shapesArray[i].getRadius();
    var leftEdge = shapesArray[i + 1].getXPos() - shapesArray[i + 1].getRadius();
    if (rightEdge >= leftEdge) {
      return true
    } else {
      return false
    }
  }
}


//SERVER AND PORT FUNCTIONS
function serverConnected() {
  println('Connected to server.');
}

function portOpen() {
  println('The serial port opened.')
}

function serialEvent() {
  inByte = Number(serial.read());
}

function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}

function portClose() {
  println('The serial port closed.');
}