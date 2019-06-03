export class QuickReply {
    content_type: string;
    title: string;
    payload: string;

    constructor(title: string, payload: string){
        this.content_type = "text";
        this.title = title;
        this.payload = payload;
    }
}