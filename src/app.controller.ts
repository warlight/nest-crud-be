import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  index(): string {
    return 'CRUD books API on /books';
  }
}
