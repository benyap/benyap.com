import { TitleField } from "@prismicio/types";
import { GroupField } from "@prismicio/types";
import { LinkField } from "@prismicio/types";
import { SelectField } from "@prismicio/types";
import { RichTextField } from "@prismicio/types";
import { ImageField } from "@prismicio/types";

export interface CVPage {
  id: "cv_page";
  label: "CV Page";
  repeatable: false;
  json: {
    title: TitleField;
    subtitle: TitleField;
    location: TitleField;
    contact: GroupField<{
      text: TitleField;
      url: LinkField;
      icon: SelectField;
    }>;
    summary: RichTextField;
    expertise_title: TitleField;
    skills_title: TitleField;
    skills: GroupField<{
      name: TitleField;
    }>;
    technologies_title: TitleField;
    technologies: GroupField<{
      name: TitleField;
    }>;
    experience_title: TitleField;
    experiences: GroupField<{
      role: TitleField;
      name: TitleField;
      duration: TitleField;
      description: RichTextField;
    }>;
    achievements_title: TitleField;
    achievements: GroupField<{
      organisation: TitleField;
      name: TitleField;
      year: TitleField;
      description: RichTextField;
    }>;
    education_title: TitleField;
    education: GroupField<{
      image: ImageField;
      name: TitleField;
      qualification: TitleField;
      duration: TitleField;
    }>;
    projects_title: TitleField;
    projects: GroupField<{
      client: TitleField;
      name: TitleField;
      duration: TitleField;
      description: RichTextField;
      link_type: SelectField;
      link: LinkField;
    }>;
  };
}

export const CVPageDefinition = {
  "id": "cv_page",
  "label": "CV Page",
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
      "location": {
        "type": "StructuredText",
        "config": {
          "single": "heading6",
          "label": "location"
        }
      },
      "contact": {
        "type": "Group",
        "config": {
          "fields": {
            "text": {
              "type": "StructuredText",
              "config": {
                "single": "heading6",
                "label": "text"
              }
            },
            "url": {
              "type": "Link",
              "config": {
                "label": "url",
                "select": null
              }
            },
            "icon": {
              "type": "Select",
              "config": {
                "options": [
                  "email",
                  "linkedin",
                  "github",
                  "website"
                ],
                "label": "icon"
              }
            }
          },
          "label": "contact"
        }
      },
      "summary": {
        "type": "StructuredText",
        "config": {
          "multi": "paragraph,strong,em,hyperlink,list-item,o-list-item",
          "label": "summary"
        }
      }
    },
    "Expertise": {
      "expertise_title": {
        "type": "StructuredText",
        "config": {
          "single": "heading2",
          "label": "expertise title"
        }
      },
      "skills_title": {
        "type": "StructuredText",
        "config": {
          "single": "heading3",
          "label": "skills title"
        }
      },
      "skills": {
        "type": "Group",
        "config": {
          "fields": {
            "name": {
              "type": "StructuredText",
              "config": {
                "single": "heading6",
                "label": "name"
              }
            }
          },
          "label": "skills"
        }
      },
      "technologies_title": {
        "type": "StructuredText",
        "config": {
          "single": "heading3",
          "label": "technologies title"
        }
      },
      "technologies": {
        "type": "Group",
        "config": {
          "fields": {
            "name": {
              "type": "StructuredText",
              "config": {
                "single": "heading6",
                "label": "name"
              }
            }
          },
          "label": "technologies"
        }
      }
    },
    "Experience": {
      "experience_title": {
        "type": "StructuredText",
        "config": {
          "single": "heading2",
          "label": "experience title"
        }
      },
      "experiences": {
        "type": "Group",
        "config": {
          "fields": {
            "role": {
              "type": "StructuredText",
              "config": {
                "single": "heading6",
                "label": "role"
              }
            },
            "name": {
              "type": "StructuredText",
              "config": {
                "single": "heading3",
                "label": "name"
              }
            },
            "duration": {
              "type": "StructuredText",
              "config": {
                "single": "heading6",
                "label": "duration"
              }
            },
            "description": {
              "type": "StructuredText",
              "config": {
                "multi": "paragraph,strong,em,hyperlink,list-item,o-list-item",
                "label": "description"
              }
            }
          },
          "label": "experiences"
        }
      }
    },
    "Achievements": {
      "achievements_title": {
        "type": "StructuredText",
        "config": {
          "single": "heading2",
          "label": "achievements title"
        }
      },
      "achievements": {
        "type": "Group",
        "config": {
          "fields": {
            "organisation": {
              "type": "StructuredText",
              "config": {
                "single": "heading6",
                "label": "organisation"
              }
            },
            "name": {
              "type": "StructuredText",
              "config": {
                "single": "heading3",
                "label": "name"
              }
            },
            "year": {
              "type": "StructuredText",
              "config": {
                "single": "heading6",
                "label": "year"
              }
            },
            "description": {
              "type": "StructuredText",
              "config": {
                "single": "paragraph",
                "label": "description"
              }
            }
          },
          "label": "achievements"
        }
      }
    },
    "Education": {
      "education_title": {
        "type": "StructuredText",
        "config": {
          "single": "heading2",
          "label": "education title"
        }
      },
      "education": {
        "type": "Group",
        "config": {
          "fields": {
            "image": {
              "type": "Image",
              "config": {
                "constraint": {
                  "width": 48,
                  "height": 48
                },
                "thumbnails": [],
                "label": "image"
              }
            },
            "name": {
              "type": "StructuredText",
              "config": {
                "single": "heading6",
                "label": "name"
              }
            },
            "qualification": {
              "type": "StructuredText",
              "config": {
                "single": "heading3",
                "label": "qualification"
              }
            },
            "duration": {
              "type": "StructuredText",
              "config": {
                "single": "heading6",
                "label": "duration"
              }
            }
          },
          "label": "education"
        }
      }
    },
    "Projects": {
      "projects_title": {
        "type": "StructuredText",
        "config": {
          "single": "heading2",
          "label": "projects title"
        }
      },
      "projects": {
        "type": "Group",
        "config": {
          "fields": {
            "client": {
              "type": "StructuredText",
              "config": {
                "single": "heading6",
                "label": "client"
              }
            },
            "name": {
              "type": "StructuredText",
              "config": {
                "single": "heading3",
                "label": "name"
              }
            },
            "duration": {
              "type": "StructuredText",
              "config": {
                "single": "heading6",
                "label": "duration"
              }
            },
            "description": {
              "type": "StructuredText",
              "config": {
                "multi": "paragraph,heading3,strong,em,hyperlink,list-item,o-list-item",
                "label": "description"
              }
            },
            "link_type": {
              "type": "Select",
              "config": {
                "options": [
                  "github"
                ],
                "label": "link type"
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
          "label": "projects"
        }
      }
    }
  },
  "status": true
}
