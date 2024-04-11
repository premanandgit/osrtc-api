import * as mqtt from 'mqtt';

// const MQTT_BROKER_URL = 'mqtt://test.mosquitto.org'; // Change this to your MQTT broker URL
const MQTT_BROKER_URL = 'mqtt://0.0.0.0:1883'; // Own Mosquitto Docker Container
const TOPIC_TO_SERVER = 'topic/fromClientToServer';
const TOPIC_TO_CLIENT = 'topic/fromServerToClient';

export const startMqttServer = () => {
  const client = mqtt.connect(MQTT_BROKER_URL);

  client.on('connect', () => {
    console.log('MQTT Client connected');

    client.subscribe(TOPIC_TO_SERVER, (err) => {
      if (!err) {
        console.log('Subscribed to topic:', TOPIC_TO_SERVER);
      } else {
        console.error('Error subscribing to topic:', err);
      }
    });
  });

  client.on('message', (topic, message) => {
    console.log('Received message from topic:', topic.toString());

    if (topic === TOPIC_TO_SERVER) {
      const parsedMessage = JSON.parse(message.toString());
      console.log('Message from client:', parsedMessage);
      // Process the message from the client as needed
      // Example: Prepare a response message
      const responsePayload = { response: 'Acknowledged', data: parsedMessage };
      // Send the response back to the client
      client.publish(TOPIC_TO_CLIENT, JSON.stringify(responsePayload));
    }
  });

  client.on('error', (err) => {
    console.error('MQTT Client error:', err);
    // Handle the error as needed (e.g., reconnect, log, etc.)
  });

  client.on('close', () => {
    console.log('MQTT Client closed');
    // Handle client close event if necessary
  });

  const sendMessageToClient = (payload: any) => {
    client.publish(TOPIC_TO_CLIENT, JSON.stringify(payload));
  };

  return {
    sendMessageToClient,
  };
};
