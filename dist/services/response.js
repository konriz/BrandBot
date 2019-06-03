"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Response {
    static genQuickReply(text, quickReplies) {
        let response = {
            text: text,
            quick_replies: quickReplies
        };
        for (let quickReply of quickReplies) {
            response["quick_replies"].push({
                content_type: "text",
                title: quickReply["title"],
                payload: quickReply["payload"]
            });
        }
        return response;
    }
    static genGenericTemplate(image_url, title, subtitle, buttons) {
        let response = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [
                        {
                            title: title,
                            subtitle: subtitle,
                            image_url: image_url,
                            buttons: buttons
                        }
                    ]
                }
            }
        };
        return response;
    }
    static genImageTemplate(image_url, title, subtitle = "") {
        let response = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "generic",
                    elements: [
                        {
                            title: title,
                            subtitle: subtitle,
                            image_url: image_url
                        }
                    ]
                }
            }
        };
        return response;
    }
    static genButtonTemplate(title, buttons) {
        let response = {
            attachment: {
                type: "template",
                payload: {
                    template_type: "button",
                    text: title,
                    buttons: buttons
                }
            }
        };
        return response;
    }
    static genText(text) {
        let response = {
            text: text
        };
        return response;
    }
    static genTextWithPersona(text, persona_id) {
        let response = {
            text: text,
            persona_id: persona_id
        };
        return response;
    }
    static genPostbackButton(title, payload) {
        let response = {
            type: "postback",
            title: title,
            payload: payload
        };
        return response;
    }
    static genWebUrlButton(title, url) {
        let response = {
            type: "web_url",
            title: title,
            url: url
        };
        return response;
    }
    static genNuxMessage(user) {
        let welcome = this.genText("Welcome");
        let guide = this.genText("Guide");
        let curation = this.genQuickReply("Hi", [
            {
                title: "Sig",
                payload: "CURATION"
            },
            {
                title: "MNU",
                payload: "CARE_HELP"
            }
        ]);
        return [welcome, guide, curation];
    }
}
exports.Response = Response;
;
//# sourceMappingURL=response.js.map