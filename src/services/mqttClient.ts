import * as mqtt from 'mqtt';

const MQTT_BROKER_URL = 'mqtt://test.mosquitto.org'; // Change this to your MQTT broker URL
const TOPIC_TO_SERVER = 'topic/fromClientToServer';
const TOPIC_TO_CLIENT = 'topic/fromServerToClient';

const client = mqtt.connect(MQTT_BROKER_URL);

client.on('connect', () => {
  console.log('MQTT Client connected');

  client.subscribe(TOPIC_TO_CLIENT, (err) => {
    if (!err) {
      console.log('Subscribed to topic:', TOPIC_TO_CLIENT);
    } else {
      console.error('Error subscribing to topic:', err);
    }
  });
});

client.on('message', (topic, message) => {
  console.log('Received message from topic:', topic.toString());

  // Handle incoming messages based on the topic
  if (topic === TOPIC_TO_CLIENT) {
    const parsedMessage = JSON.parse(message.toString());
    console.log('Message from server:', parsedMessage);
  }
});

export const sendMessageToServer = (payload: any) => {
  client.publish(TOPIC_TO_SERVER, JSON.stringify(payload));
};
