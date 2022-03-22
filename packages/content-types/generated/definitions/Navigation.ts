import { GroupField } from "@prismicio/types";
import { TitleField } from "@prismicio/types";
import { LinkField } from "@prismicio/types";

export interface Navigation {
  id: "navigation";
  label: "Navigation";
  repeatable: false;
  json: {
    items: GroupField<{
      name: TitleField;
      link: LinkField;
    }>;
  };
}

export const NavigationDefinition = {
  "id": "navigation",
  "label": "Navigation",
  "repeatable": false,
  "json": {
    "Main": {
      "items": {
        "type": "Group",
        "config": {
          "fields": {
            "name": {
              "type": "StructuredText",
              "config": {
                "single": "heading1",
                "label": "name"
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
          "label": "items"
        }
      }
    }
  },
  "status": true
}
