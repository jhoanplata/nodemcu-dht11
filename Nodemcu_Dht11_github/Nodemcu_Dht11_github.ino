#include <DHT.h>  //Instalar librerias
#include <ESP8266WiFi.h>
#define DHTTYPE DHT11

String apiKey = "***** "; //Api generada en thingspeak
const char* ssid = "**********"; // red Wifi
const char* password = "********"; //Clave Wifi

const char* server = "api.thingspeak.com";
const int DHTPin = 5; 
DHT dht(DHTPin, DHTTYPE);
WiFiClient client;

void setup() {
Serial.begin(115200);
delay(10);
dht.begin();

WiFi.begin(ssid, password);

Serial.println();
Serial.println();
Serial.print("Conectando con ");
Serial.println(ssid);

WiFi.begin(ssid, password);

while (WiFi.status() != WL_CONNECTED) {
delay(500);
Serial.print(".");
}
Serial.println("");
Serial.println("WiFi conectado");
}

void loop() {

float h = dht.readHumidity(); 
float t = dht.readTemperature(); 
if (isnan(h) || isnan(t)) {
Serial.println("Error de lectura del sensor DHT");
return;
}

if (client.connect(server,80)) { 
String postStr = apiKey;
postStr +="&field1=";
postStr += String(t); 
postStr +="&field2=";
postStr += String(h); 
postStr += "\r\n\r\n";

client.print("POST /update HTTP/1.1\n");
client.print("Host: api.thingspeak.com\n");
client.print("Connection: close\n");
client.print("X-THINGSPEAKAPIKEY: "+apiKey+"\n");
client.print("Content-Type: application/x-www-form-urlencoded\n");
client.print("Content-Length: ");
client.print(postStr.length());
client.print("\n\n");
client.print(postStr);

Serial.print("Temperatura: ");
Serial.print(t);
Serial.print(" Humedad: ");
Serial.print(h);
Serial.println("Enviando a Thingspeak");
}
client.stop();

Serial.println("Esperando…");
delay(20000);
}
