import { TitleField } from "@prismicio/types";
import { RichTextField } from "@prismicio/types";

export interface AboutPage {
  id: "about_page";
  label: "About Page";
  repeatable: false;
  json: {
    title: TitleField;
    subtitle: TitleField;
    description: RichTextField;
    cv_title: TitleField;
    cv_description: RichTextField;
    blog_title: TitleField;
    blog_description: RichTextField;
    contact_title: TitleField;
    contact_subtitle: TitleField;
  };
}

export const AboutPageDefinition = {
  "id": "about_page",
  "label": "About Page",
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
      "description": {
        "type": "StructuredText",
        "config": {
          "multi": "paragraph,strong,em,hyperlink,list-item,o-list-item",
          "label": "description"
        }
      },
      "cv_title": {
        "type": "StructuredText",
        "config": {
          "single": "heading2",
          "label": "cv title"
        }
      },
      "cv_description": {
        "type": "StructuredText",
        "config": {
          "multi": "paragraph,strong,em,hyperlink,list-item,o-list-item",
          "label": "cv description"
        }
      },
      "blog_title": {
        "type": "StructuredText",
        "config": {
          "single": "heading2",
          "label": "blog title"
        }
      },
      "blog_description": {
        "type": "StructuredText",
        "config": {
          "multi": "paragraph,heading4,strong,em,hyperlink,list-item,o-list-item",
          "label": "blog description"
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
