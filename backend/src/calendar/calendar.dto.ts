export class CreateEventDto {
    date: string; // Format: YYYY-MM-DD
    hour: string; // Format: HH:mm
    description: string;
    emails: string[];
}
