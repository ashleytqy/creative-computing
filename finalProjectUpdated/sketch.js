//SERIAL CONNECTION VARIABLES
var prevSensors = [];
var inputPot;
var btn1 = 0;
var btn2 = 0;
var serial; // variable to hold an instance of the serialport library
var portName = '/dev/cu.usbmodem1421'; // fill in your serial port name here

//CANVAS VARIABLES
var amp = 0.8;
var mode = 1;
var count = 0;
var bgColor = "#212121";
var shapesArray = [];
var energyArray = ["bass", "lowMid", "mid", "highMid", "treble"]
var strokeCol = randomColor({
  luminosity: 'light'
});
var soundArray = [];

function preload() {
  sound = loadSound('songs/10.mp3');
}

function setup() {
  //SERIAL
  serial = new p5.SerialPort(); // make a new instance of the serialport library
  serial.on('list', printList); // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen); // callback for the port opening
  serial.on('data', serialEvent); // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.on('close', portClose); // callback for the port closing

  serial.list(); // list the serial ports
  serial.open(portName); // open a serial port

  //CANVAS
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.mouseClicked(togglePlay);
  background(bgColor);
  fft = new p5.FFT(0, 1024);
}

function draw() {;
  background(bgColor);

  if (mode == 1) {
    circleMode();
  } else if (mode == 2) {
    waveMode();
  } else {
    circleMode();
    waveMode();
  }

  buttonPressed()
  //map amplitude to potentiometer value
  if (inputPot != null) {
    amp = map(inputPot, 0, 255, 0, 1);
    sound.amp(amp);
  } else {
    amp = 0.8;
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

  var spectrum = fft.analyze(); //store in a variable
  for (var i = 0; i < 5; i++) {
    shapesArray[i].create();
    shapesArray[i].update(fft.getEnergy(energyArray[i]));
  }

  if (checkOverlap() == true) {
    count++;
    //prevent background color from changing too frequently
    if (count == 1 || count % 20 == 0) {
      bgColor = randomColor({
        luminosity: 'dark',
        hue: 'blue'
      });
    }

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

function toggleMode() {
  if (mode == 1) {
    mode = 2;
  } else if (mode == 2) {
    mode = 3;
  } else {
    mode = 1;
  }
}

function buttonPressed() {
  if (btn1 == 1) {
    for (var i = 0; i < shapesArray.length; i++) {
      var newColor = randomColor({
        luminosity: 'light'
      });
      shapesArray[i].setColor(newColor);
    }
  }

  if (btn2 == 1) {
    toggleMode();
  }
}


function togglePlay() {
  //distance is far > stop; if close > play
  if (sound.isPlaying()) {
    sound.pause();
  } else {
    sound.loop();
  }
}