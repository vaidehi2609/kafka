// Using KafkaJs nodejs library
var { Kafka } = require('kafkajs');

// kafka broker running on localhost:9092 default port
const kafkaBroker = 'localhost:9092';

// kafka topic used for queue messages
const kafkaTopic = 'message-queue';

// kafka stream groupId : It will be created automatically
const kafkaGroupId = 'message-queue-group';

// kafka client with basic config
const KafkaClient = new Kafka({
  brokers: [kafkaBroker]
});


module.exports={ KafkaClient, kafkaTopic, kafkaGroupId}