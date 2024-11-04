#include "BluetoothSerial.h"
#include <BleKeyboard.h>

BleKeyboard bleKeyboard("SiRekap OSIS"); // Set the Bluetooth device name

// Pin assignments for buttons, LED, and buzzer
const int key1Pin = 13;
const int key2Pin = 12;
const int keyAPin = 14;
const int shiftPin = 27;
const int shiftLEDpin = 26; // LED pin for shift mode indicator
const int keyLEDpin = 25;
const int buzzerPin = 33;

// Variables to handle shift mode and debouncing
bool shiftActive = false;
bool prevShiftState = LOW;

void setup() {
  Serial.begin(9600); // Set serial communication at 9600 baud
  pinMode(key1Pin, INPUT_PULLUP);
  pinMode(key2Pin, INPUT_PULLUP);
  pinMode(keyAPin, INPUT_PULLUP);
  pinMode(shiftPin, INPUT_PULLUP);
  pinMode(shiftLEDpin, OUTPUT); // Set LED pin as output
  pinMode(keyLEDpin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);

  // Start BLE Keyboard
  bleKeyboard.begin();
  Serial.println("Alat sudah siap digunakan!");
}

void loop() {
  if (bleKeyboard.isConnected()) {
    // Check the Shift button for toggling shift mode
    bool currentShiftState = digitalRead(shiftPin) == LOW; // Active low

    if (currentShiftState && !prevShiftState) { // Button pressed
      shiftActive = !shiftActive; // Toggle shift state
      Serial.print("Shift mode: ");
      Serial.println(shiftActive ? "ON" : "OFF");

      // Set LED state based on shiftActive
      digitalWrite(shiftLEDpin, shiftActive ? HIGH : LOW);

      // Play double beep sound for shift activation
      playBeep(500); // First beep
      delay(500);
      playBeep(500); // Second beep
    }
    prevShiftState = currentShiftState;

    // Check each button and perform actions
    checkButton(key1Pin, shiftActive ? '!' : '1');
    checkButton(key2Pin, shiftActive ? '@' : '2');
    checkButton(keyAPin, shiftActive ? 'A' : 'a');
  }
}

// Function to check button state and handle LED & buzzer logic
void checkButton(int buttonPin, char keyChar) {
  bool buttonPressed = digitalRead(buttonPin) == LOW;
  if (buttonPressed) { // Button is pressed
    unsigned long pressStartTime = millis();

    // Detect if the button is held down
    while (digitalRead(buttonPin) == LOW) {
      digitalWrite(keyLEDpin, HIGH); // Keep LED on
      tone(buzzerPin, 1000);         // Continuous beep sound
      delay(50);                     // Small delay to keep tone active
    }

    // Button is released
    digitalWrite(keyLEDpin, LOW); // Turn off LED
    noTone(buzzerPin);            // Stop beep

    unsigned long pressDuration = millis() - pressStartTime;

    // Short press actions (1 second LED and bip-bop sound)
    if (pressDuration < 1000) {
      digitalWrite(keyLEDpin, HIGH); // LED on
      playBipBop();                  // Play bip-bop sound
      digitalWrite(keyLEDpin, LOW);  // LED off
    }

    // Send key press over BLE
    bleKeyboard.press(keyChar);
    Serial.println(keyChar);
    delay(200); // Debounce delay
    bleKeyboard.releaseAll();
  }
}

// Function to play a single beep sound
void playBeep(int duration) {
  tone(buzzerPin, 1000, duration);
  delay(duration); // Wait for the tone to finish
}

// Function to play bip-bop sound with different pitches and quicker delay
void playBipBop() {
  tone(buzzerPin, 1200, 100); // Higher pitch for "bip"
  delay(120);                 // Short delay between sounds
  tone(buzzerPin, 800, 100);  // Lower pitch for "bop"
  delay(120);                 // Delay before next action
}