export class Bubble {
    user: string;
    timestamp: Date;
    message: string;
    attachment?: string;
   
    constructor(user: string, timestamp: Date, message: string, attachment?: string) {
      this.user = user;
      this.timestamp = timestamp;
      this.message = message;
      this.attachment = attachment;
    }
}