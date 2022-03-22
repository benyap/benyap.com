import { TitleField } from "@prismicio/types";

export interface HomePage {
  id: "home_page";
  label: "Home Page";
  repeatable: false;
  json: {
    title: TitleField;
    subtitle: TitleField;
    post_title: TitleField;
    recent_posts_subtitle: TitleField;
    contact_title: TitleField;
    contact_subtitle: TitleField;
  };
}

export const HomePageDefinition = {
  "id": "home_page",
  "label": "Home Page",
  "repeatable": false,
  "json": {
    "Main": {
      "title": {
        "type": "StructuredText",
        "config": {
          "single": "heading1",
          "label": "title"
        }
      },
      "subtitle": {
        "type": "StructuredText",
        "config": {
          "single": "heading6",
          "label": "subtitle"
        }
      },
      "post_title": {
        "type": "StructuredText",
        "config": {
          "single": "heading2",
          "label": "posts title"
        }
      },
      "recent_posts_subtitle": {
        "type": "StructuredText",
        "config": {
          "single": "heading6",
          "label": "recent posts subtitle"
        }
      },
      "contact_title": {
        "type": "StructuredText",
        "config": {
          "single": "heading2",
          "label": "contact title"
        }
      },
      "contact_subtitle": {
        "type": "StructuredText",
        "config": {
          "single": "heading6",
          "label": "contact subtitle"
        }
      }
    }
  },
  "status": true
}
