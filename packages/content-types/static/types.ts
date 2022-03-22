import { ContentTypeField } from "./fields";

export interface ContentTypeDefinition {
  id: string;
  label: string;
  repeatable: boolean;
  status: boolean;
  json: {
    [section: string]: {
      [key: string]: ContentTypeField;
    };
  };
}
