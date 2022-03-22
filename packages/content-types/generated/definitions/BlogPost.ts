import { CustomTypeModelUIDField } from "@prismicio/types";
import { TitleField } from "@prismicio/types";
import { RichTextField } from "@prismicio/types";
import { ImageField } from "@prismicio/types";

export interface BlogPost {
  id: "post";
  label: "Blog Post";
  repeatable: true;
  json: {
    uid: CustomTypeModelUIDField;
    title: TitleField;
    preamble: RichTextField;
    image: ImageField;
    body: RichTextField;
    contact_title: TitleField;
    contact_subtitle: TitleField;
  };
}

export const BlogPostDefinition = {
  "id": "post",
  "label": "Blog Post",
  "repeatable": true,
  "json": {
    "Main": {
      "uid": {
        "type": "UID",
        "config": {
          "label": "id"
        }
      },
      "title": {
        "type": "StructuredText",
        "config": {
          "single": "heading1",
          "label": "title"
        }
      },
      "preamble": {
        "type": "StructuredText",
        "config": {
          "single": "paragraph,strong,em",
          "label": "preamble"
        }
      },
      "image": {
        "type": "Image",
        "config": {
          "constraint": {
            "width": 600,
            "height": 270
          },
          "thumbnails": [],
          "label": "image"
        }
      },
      "body": {
        "type": "StructuredText",
        "config": {
          "multi": "paragraph,preformatted,heading1,heading2,heading3,heading4,heading5,heading6,strong,em,hyperlink,image,embed,list-item,o-list-item,rtl",
          "label": "body"
        }
      }
    },
    "Contact": {
      "contact_title": {
        "type": "StructuredText",
        "config": {
          "single": "heading3",
          "label": "contact title",
          "placeholder": "Default value \"Get in touch\" (provide value to override)"
        }
      },
      "contact_subtitle": {
        "type": "StructuredText",
        "config": {
          "single": "heading6",
          "label": "contact subtitle",
          "placeholder": "Default value \"Like what you see, or have questions? Let’s have a conversation.\" (provide value to override)"
        }
      }
    }
  },
  "status": true
}
