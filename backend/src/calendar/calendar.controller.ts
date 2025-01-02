import { Controller, Post, Body } from '@nestjs/common';
import { GoogleCalendarService } from './calendar.service';

@Controller('calendar')
export class GoogleCalendarController {
  constructor(private readonly calendarService: GoogleCalendarService) { }

  @Post('event')
  async createEvent(@Body() body: any) {
    const { date, hour, description, emails } = body;
    return this.calendarService.createEvent(date, hour, description, emails);
  }
}
