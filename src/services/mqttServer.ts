import mqtt, { MqttClient } from 'mqtt';

export function startMqttService() {
    const client: MqttClient = mqtt.connect('mqtt://test.mosquitto.org');

    client.on('connect', () => {
        client.subscribe('presence', (err) => {
            if (!err) {
                client.publish('presence', 'Hello');
            }
        });
    });

    client.on('message', (topic: string, message: Buffer) => {
        // message is Buffer
        console.log("message ", message.toString());
        client.end();
    });
}

// import mqtt, { IClientOptions, MqttClient } from 'mqtt';

// class MQTTModule {
//   private client: MqttClient;

//   constructor(private brokerUrl: string, private options: IClientOptions = {}) {
//     this.client = mqtt.connect(brokerUrl, options);

//     this.client.on('connect', () => {
//       console.log('Connected to MQTT broker');
//     });
//     this.client.on('error', (err) => {
//       console.error('MQTT error:', err);
//     });

//     this.client.on('message', (topic, message) => {
//       console.log(`Received message on topic ${topic}: ${message.toString()}`);
//       // Process incoming message here
//     });
//   }

//   subscribe(topic: string): void {
//     this.client.subscribe(topic, (err) => {
//       if (err) {
//         console.error('Subscribe error:', err);
//       } else {
//         console.log(`Subscribed to topic ${topic}`);
//       }
//     });
//   }

//   publish(topic: string, message: string): void {
//     this.client.publish(topic, message, (err) => {
//       if (err) {
//         console.error('Publish error:', err);
//       } else {
//         console.log(`Published message "${message}" to topic ${topic}`);
//       }
//     });
//   }

//   unsubscribe(topic: string): void {
//     this.client.unsubscribe(topic, (err) => {
//       if (err) {
//         console.error('Unsubscribe error:', err);
//       } else {
//         console.log(`Unsubscribed from topic ${topic}`);
//       }
//     });
//   }

//   end(): void {
//     this.client.end();
//     console.log('Disconnected from MQTT broker');
//   }
// }

// export default MQTTModule;

