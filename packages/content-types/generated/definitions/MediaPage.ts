import { GroupField } from "@prismicio/types";
import { TitleField } from "@prismicio/types";

export interface MediaPage {
  id: "media_page";
  label: "Media Page";
  repeatable: false;
  json: {
    sections: GroupField<{
      section_title: TitleField;
      tag: TitleField;
    }>;
  };
}

export const MediaPageDefinition = {
  "id": "media_page",
  "label": "Media Page",
  "repeatable": false,
  "json": {
    "Main": {
      "sections": {
        "type": "Group",
        "config": {
          "fields": {
            "section_title": {
              "type": "StructuredText",
              "config": {
                "single": "heading2",
                "label": "section title"
              }
            },
            "tag": {
              "type": "StructuredText",
              "config": {
                "single": "heading6",
                "label": "tag"
              }
            }
          },
          "label": "sections"
        }
      }
    }
  },
  "status": true
}
