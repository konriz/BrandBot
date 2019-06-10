export class QuickReply {
    content_type: string = "text";
    title: string;
    payload: string;
    image_url: string;

    constructor(title: string, payload: string, image?: string){
        this.title = title;
        this.payload = payload;
        this.image_url = image;
    }
}