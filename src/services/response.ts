import { User } from "./user";

export class Response {
  static genQuickReply(text: string, quickReplies: any) {
    
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

  static genGenericTemplate(image_url: string, title: string, subtitle: string, buttons: string) {
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

  static genImageTemplate(image_url: string, title: string, subtitle = "") {
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

  static genButtonTemplate(title: string, buttons: string) {
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

  static genText(text: string) {
    let response = {
      text: text
    };

    return response;
  }

  static genTextWithPersona(text: string, persona_id: string) {
    let response = {
      text: text,
      persona_id: persona_id
    };

    return response;
  }

  static genPostbackButton(title: string, payload: string) {
    let response = {
      type: "postback",
      title: title,
      payload: payload
    };

    return response;
  }

  static genWebUrlButton(title: string, url: string) {
    let response = {
      type: "web_url",
      title: title,
      url: url
    };

    return response;
  }

  static genNuxMessage(user: User) {
    let welcome = this.genText(
      "Welcome"
    );

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
};
