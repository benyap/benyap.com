import { CustomTypeModelUIDField } from "@prismicio/types";
import { TitleField } from "@prismicio/types";
import { RichTextField } from "@prismicio/types";
import { GroupField } from "@prismicio/types";
import { ImageField } from "@prismicio/types";

export interface GalleryPost {
  id: "gallery_post";
  label: "Gallery Post";
  repeatable: true;
  json: {
    uid: CustomTypeModelUIDField;
    title: TitleField;
    preamble: RichTextField;
    gallery: GroupField<{
      image: ImageField;
      description: TitleField;
    }>;
    contact_title: TitleField;
    contact_description: TitleField;
  };
}

export const GalleryPostDefinition = {
  "id": "gallery_post",
  "label": "Gallery Post",
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
          "single": "paragraph,strong,em,hyperlink",
          "label": "preamble"
        }
      },
      "gallery": {
        "type": "Group",
        "config": {
          "fields": {
            "image": {
              "type": "Image",
              "config": {
                "constraint": {},
                "thumbnails": [],
                "label": "image"
              }
            },
            "description": {
              "type": "StructuredText",
              "config": {
                "single": "heading6",
                "label": "description"
              }
            }
          },
          "label": "gallery"
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
      "contact_description": {
        "type": "StructuredText",
        "config": {
          "single": "heading6",
          "label": "contact description",
          "placeholder": "Default value \"Like what you see, or have questions? Let's have a conversation.\" (provide value to override)"
        }
      }
    }
  },
  "status": true
}
