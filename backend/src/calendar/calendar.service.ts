import { Injectable } from '@nestjs/common';
import { google, calendar_v3 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleCalendarService {
    private calendar: calendar_v3.Calendar;
    private authClient: OAuth2Client;

    constructor() {
        // Load credentials from a JSON file
        const credentials = require('./credentials.json'); // Replace with your credentials file path

        const { client_id, client_secret, redirect_uris } = credentials.web;
        this.authClient = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

        // Set the access token (or refresh token logic)
        this.authClient.setCredentials({
            access_token: '<YOUR_ACCESS_TOKEN>', // Replace with your valid access token
        });

        this.calendar = google.calendar({ version: 'v3', auth: this.authClient });
    }

    async createEvent(
        date: string,
        hour: string,
        description: string,
        emails: string[],
    ): Promise<calendar_v3.Schema$Event> {
        const event: calendar_v3.Schema$Event = {
            summary: description,
            start: {
                dateTime: `${date}T${hour}:00`,
                timeZone: 'UTC', // Adjust timezone as needed
            },
            end: {
                dateTime: `${date}T${hour}:30`, // Example: 30 minutes duration
                timeZone: 'UTC',
            },
            attendees: emails.map(email => ({ email })),
        };

        const response = await this.calendar.events.insert({
            calendarId: 'primary',
            requestBody: event,
        });

        return response.data;
    }
}
