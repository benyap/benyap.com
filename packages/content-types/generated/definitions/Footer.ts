import { GroupField } from "@prismicio/types";
import { SelectField } from "@prismicio/types";
import { LinkField } from "@prismicio/types";
import { TitleField } from "@prismicio/types";

export interface Footer {
  id: "footer";
  label: "Footer";
  repeatable: false;
  json: {
    links: GroupField<{
      icon: SelectField;
      link: LinkField;
    }>;
    text: TitleField;
  };
}

export const FooterDefinition = {
  "id": "footer",
  "label": "Footer",
  "repeatable": false,
  "json": {
    "Main": {
      "links": {
        "type": "Group",
        "config": {
          "fields": {
            "icon": {
              "type": "Select",
              "config": {
                "options": [
                  "email",
                  "linkedin",
                  "github"
                ],
                "label": "icon"
              }
            },
            "link": {
              "type": "Link",
              "config": {
                "label": "link",
                "select": null
              }
            }
          },
          "label": "links"
        }
      },
      "text": {
        "type": "StructuredText",
        "config": {
          "single": "heading1",
          "label": "text"
        }
      }
    }
  },
  "status": true
}
