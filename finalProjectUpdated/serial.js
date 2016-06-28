//SERIAL FUNCTIONS

function serialEvent() {
  // until you get carriage return and newline:
  var inString = serial.readStringUntil('\r\n');
  //check to see that there's actually a string there:
  if (inString.length > 0) {
    if (inString !== 'hello') {
      inString = inString.trim();
      var sensors = split(inString, ','); // split the string on the commas
      if (sensors.length > 2) {
        //only change values of variables if it has changed
        if (prevSensors.length == 0 || sensors[0] != prevSensors[0] || sensors[1] != prevSensors[1] || sensors[2] != prevSensors[2]) {
          inputPot = sensors[0];
          btn1 = sensors[1];
          btn2 = sensors[2];
          prevSensors = [inputPot, btn1, btn2];
          print(prevSensors);
        }
        
      }
    }
    serial.write('x'); // send a byte requesting more serial data
  }
}

function serverConnected() {
  println('connected to server.');
}

function portOpen() {
  println('the serial port opened.')
}

function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}

function portClose() {
  println('The serial port closed.');
}

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    println(i + " " + portList[i]);
  }
}


// if (prevSensor.length == 0 || sensors[0] != prevSensor[0] || sensors[1] != prevSensor[1] || sensors[2] != prevSensors[2]) {
//   inputPot = Number(sensors[0]);
//   btn1 = Number(sensors[1]);
//   btn2 = Number(sensors[2]);
//   prevSensors = [inputPot, btn1, btn2];
// }