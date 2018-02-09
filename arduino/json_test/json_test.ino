#include <ArduinoJson.h>
#include "Adafruit_CCS811.h"

const byte interrupt_pin = 2;

Adafruit_CCS811 ccs;
volatile int co2, voc;

void get_and_send_data() {
  co2 = ccs.geteCO2();
  voc = ccs.getTVOC();

  const size_t bufferSize = 3*JSON_OBJECT_SIZE(2) + JSON_OBJECT_SIZE(3);
  DynamicJsonBuffer jsonBuffer(bufferSize);

  JsonObject& root = jsonBuffer.createObject();
  root["sensor"] = "gas";

  JsonObject& data = root.createNestedObject("data");

  JsonObject& data_co2 = data.createNestedObject("co2");
  data_co2["unit"] = "ppm";
  data_co2["value"] = co2;

  JsonObject& data_voc = data.createNestedObject("voc");
  data_voc["unit"] = "ppb";
  data_voc["value"] = voc;

  root.printTo(Serial);
}

void setup() {
  Serial.begin(9600);
  if(!ccs.begin()){
    Serial.println("shits broke");
  }
  ccs.enableInterrupt();
  ccs.setDriveMode(CCS811_DRIVE_MODE_1SEC);
//  attachInterrupt(digitalPinToInterrupt(interrupt_pin), get_and_send_data, LOW);
}

void loop() {
  if(ccs.available() && !ccs.readData()){
    get_and_send_data();
    Serial.print('\n');
  }
}

