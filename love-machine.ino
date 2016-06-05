//inputs
int forceSensor = A0;
int potentiometer = A1;

//outputs
int greenLED = 13;
int yellowLED = 12;
int redLED = 11;

int greenState = LOW;
int yellowState = LOW;
int redState = LOW;


//placeholders
int sensorVal;
int potentioVal;
unsigned long previousTime = 0;
const long interval = 1000;

void setup() {
  // open a serial connection
  Serial.begin(9600);

  //set LEDs
  pinMode(greenLED, OUTPUT);
  pinMode(yellowLED, OUTPUT);
  pinMode(redLED, OUTPUT);
}

void loop() {

  unsigned long currentTime = millis();

  sensorVal = analogRead(forceSensor) / 10;
  potentioVal = analogRead(potentiometer) / 10;
  int diff = abs(sensorVal - potentioVal);


  if (currentTime - previousTime >= interval) {
    // save the last time the LEDs blinked
    previousTime = currentTime;

    Serial.println("------------------------------------");
    Serial.print("force sensor value \t");
    Serial.println(sensorVal);
    Serial.print("potentiometer value \t");
    Serial.println(potentioVal);
    Serial.print("difference \t\t"); 
    Serial.println(diff); 
    Serial.println("------------------------------------");
    Serial.println("\n\n"); 


    if (diff < 25) {
      //turn all but green LED off 
      digitalWrite(yellowLED, LOW);
      digitalWrite(redLED, LOW);
      
    //green LED blinks ! good match <3 
      if (greenState == LOW) {
        greenState = HIGH;
      } else {
        greenState = LOW;
      };
      digitalWrite(greenLED, greenState);

    } else if ( diff >= 25 and diff < 75) {
      //turn all but yellow LED off 
      digitalWrite(greenLED, LOW);
      digitalWrite(redLED, LOW);
      
    //yellow LED blinks ! okay match ~
      if (yellowState == LOW) {
        yellowState = HIGH;
      } else {
        yellowState = LOW;
      };
      digitalWrite(yellowLED, yellowState);

    } else {
      //turn all but red LED off 
      digitalWrite(yellowLED, LOW);
      digitalWrite(greenLED, LOW);
      
    //red LED blinks ! bad match :-(
      if (redState == LOW) {
        redState = HIGH;
      } else {
        redState = LOW;
      };
      digitalWrite(redLED, redState);
    }

  }

}
