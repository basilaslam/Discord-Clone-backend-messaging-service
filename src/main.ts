import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'message_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.listen();
  console.log('Microservice is listening');
}
bootstrap();
