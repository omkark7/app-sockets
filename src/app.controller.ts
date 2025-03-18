import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // GET endpoint to fetch a specific greeting message by name
  @Get(':name')
  getPersonalizedGreeting(@Param('name') name: string): string {
    return this.appService.getPersonalizedGreeting(name);
  }
}
