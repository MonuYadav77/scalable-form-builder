const { Kafka } = require('kafkajs');

// Accept comma-separated brokers or default to localhost:9092 when not set
const rawBrokers = process.env.KAFKA_BROKER || 'localhost:9092';
const brokers = rawBrokers.split(',').map(b => b.trim()).filter(Boolean);

if (!process.env.KAFKA_BROKER) {
  console.warn('⚠️  KAFKA_BROKER not set — defaulting to localhost:9092');
} else {
  console.info(`🔧 Kafka brokers configured: ${brokers.join(',')}`);
}

const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENT_ID || 'form-builder-api',
  brokers,
});

module.exports = kafka;