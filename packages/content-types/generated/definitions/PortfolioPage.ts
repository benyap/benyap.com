import { TitleField } from "@prismicio/types";
import { SelectField } from "@prismicio/types";
import { LinkField } from "@prismicio/types";
import { GroupField } from "@prismicio/types";
import { RichTextField } from "@prismicio/types";

export interface PortfolioPage {
  id: "portfolio_page";
  label: "Portfolio Page";
  repeatable: false;
  json: {
    title: TitleField;
    open_source_title: TitleField;
    icon: SelectField;
    username: TitleField;
    link: LinkField;
    open_source_projects: GroupField<{
      name: TitleField;
      description: TitleField;
      url: LinkField;
    }>;
    open_source_subtext: RichTextField;
    projects_title: TitleField;
    projects: GroupField<{
      name: TitleField;
      description: TitleField;
      url: LinkField;
    }>;
    projects_subtext: RichTextField;
  };
}

export const PortfolioPageDefinition = {
  "id": "portfolio_page",
  "label": "Portfolio Page",
  "repeatable": false,
  "json": {
    "Main": {
      "title": {
        "type": "StructuredText",
        "config": {
          "single": "heading1",
          "label": "title"
        }
      }
    },
    "Open source": {
      "open_source_title": {
        "type": "StructuredText",
        "config": {
          "single": "heading3",
          "label": "open source title"
        }
      },
      "icon": {
        "type": "Select",
        "config": {
          "options": [
            "github"
          ],
          "default_value": "github",
          "label": "icon"
        }
      },
      "username": {
        "type": "StructuredText",
        "config": {
          "single": "heading6",
          "label": "username"
        }
      },
      "link": {
        "type": "Link",
        "config": {
          "label": "link",
          "select": null
        }
      },
      "open_source_projects": {
        "type": "Group",
        "config": {
          "fields": {
            "name": {
              "type": "StructuredText",
              "config": {
                "single": "heading4",
                "label": "name"
              }
            },
            "description": {
              "type": "StructuredText",
              "config": {
                "single": "heading6",
                "label": "description"
              }
            },
            "url": {
              "type": "Link",
              "config": {
                "label": "url",
                "select": null
              }
            }
          },
          "label": "open source projects"
        }
      },
      "open_source_subtext": {
        "type": "StructuredText",
        "config": {
          "single": "paragraph",
          "label": "open_source_subtext"
        }
      }
    },
    "Projects": {
      "projects_title": {
        "type": "StructuredText",
        "config": {
          "single": "heading3",
          "label": "projects title"
        }
      },
      "projects": {
        "type": "Group",
        "config": {
          "fields": {
            "name": {
              "type": "StructuredText",
              "config": {
                "single": "heading4",
                "label": "name"
              }
            },
            "description": {
              "type": "StructuredText",
              "config": {
                "single": "heading6",
                "label": "description"
              }
            },
            "url": {
              "type": "Link",
              "config": {
                "label": "url",
                "select": null
              }
            }
          },
          "label": "projects"
        }
      },
      "projects_subtext": {
        "type": "StructuredText",
        "config": {
          "single": "paragraph",
          "label": "projects_subtext"
        }
      }
    }
  },
  "status": true
}
