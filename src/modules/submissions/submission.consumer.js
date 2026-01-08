// This simulates a microservices

const kafka = require("../../config/kafka");
const Submission = require("./submission.model");
const logger = require("../../utils/logger");
const consumer = kafka.consumer({ groupId: "submission-workers" });

const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "form-submission" });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const data = JSON.parse(message.value.toString());
      // console.log("📩 Received message from Kafka:", data);
      logger.info({
        message: "Kafka message received",
        topic: "form-submission",
        data,
      });
      await Submission.create(data);
    },
  });
};

module.exports = startConsumer;
