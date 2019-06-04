export class QuickReply {
    content_type: string = "text";
    title: string;
    payload: string;

    constructor(title: string, payload: string){
        this.title = title;
        this.payload = payload;
    }
}