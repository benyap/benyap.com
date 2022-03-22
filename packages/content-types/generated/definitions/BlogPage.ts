import { TitleField } from "@prismicio/types";
import { NumberField } from "@prismicio/types";

export interface BlogPage {
  id: "blog_page";
  label: "Blog Page";
  repeatable: false;
  json: {
    title: TitleField;
    subtitle: TitleField;
    search_placeholder: TitleField;
    posts_per_page: NumberField;
  };
}

export const BlogPageDefinition = {
  "id": "blog_page",
  "label": "Blog Page",
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
      "search_placeholder": {
        "type": "StructuredText",
        "config": {
          "single": "heading6",
          "label": "search placeholder"
        }
      },
      "posts_per_page": {
        "type": "Number",
        "config": {
          "label": "posts per page"
        }
      }
    }
  },
  "status": true
}
