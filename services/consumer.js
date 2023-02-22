var { sendMessageToQueue } = require("./producer.js");
var { KafkaClient, kafkaTopic, kafkaGroupId } = require("../kafka_config.js");

 const consumeMessage = async () => {
  // Creating a Consumer Instance
  const consumer = KafkaClient.consumer({
    groupId: kafkaGroupId,
  });

  await consumer.connect();
  // Subscribing to out Kafka topic
  await consumer.subscribe({ topic: kafkaTopic, fromBeginning: true}).then( console.log('Subscribed'));
 

  await consumer.run({
    autoCommit: false, // It won't commit message acknowledge to kafka until we don't do manually
    eachMessage: async ({ topic, partition, message}) => {
        
      const messageData = message.value.toString();
      try {
        
        console.info('Received Message', messageData);
      } catch (error) {
        console.error(error);
        // Resending message to kafka queue for redelivery
        await sendMessageToQueue(messageData);
      } finally {
        const offset = +message.offset + 1;
        // Committing the message offset to Kafka
        await consumer.commitOffsets([{topic: kafkaTopic, partition, offset: offset.toString()}]);
      }
    }
  });
};

module.exports = { consumeMessage }