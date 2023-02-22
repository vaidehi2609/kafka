var { KafkaClient, kafkaTopic } = require("../kafka_config.js");

 const sendMessageToQueue = async (message) => {
  const producer = KafkaClient.producer();
  await producer.connect();
  console.info('Sending Message: ', message);
  await producer.send({
    topic: kafkaTopic,
    messages: [
      {
        value: JSON.stringify(message) // message data goes here
      }
    ]
  });
  // Disconnect producer 
  await producer.disconnect();
};

module.exports={sendMessageToQueue}