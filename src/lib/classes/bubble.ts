export class Bubble {
    id: string;
    user: string;
    timestamp: Date;
    message: string;
    attachment?: string;
   
    constructor(id: string, user: string, timestamp: Date, message: string, attachment?: string) {
      this.id = id;
      this.user = user;
      this.timestamp = timestamp;
      this.message = message;
      this.attachment = attachment;
    }
}