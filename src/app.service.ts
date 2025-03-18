import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // Basic method to return a hello message
  getHello(): string {
    return 'Hello World!';
  }

  // Method to return a personalized greeting
  getPersonalizedGreeting(name: string): string {
    return `Hello, ${name}!`;
  }

  // Method to create a custom greeting based on the name passed in the body
  createGreeting(name: string): string {
    return `Greetings, ${name}! Welcome to our API.`;
  }
}
