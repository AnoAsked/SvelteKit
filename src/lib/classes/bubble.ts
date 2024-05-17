export class Bubble {
    id: string;
    room: string;
    user: string;
    timestamp: Date;
    message: string;
    attachment?: string;
    tags?: string[];
   
    constructor(id: string, room: string, user: string, timestamp: Date, message: string, attachment?: string, tags?: string[]) {
      this.id = id;
      this.room = room;
      this.user = user;
      this.timestamp = timestamp;
      this.message = message;
      this.attachment = attachment;
      this.tags = tags;
    }
}