export type ContentTypeField<T extends string = string> =
  | UIDField
  | StructuredTextField
  | NumberField
  | SelectField
  | LinkField
  | ImageField
  | GroupField<T>;

export interface UIDField {
  type: "UID";
  config: {
    label: string;
  };
}

export interface StructuredTextField {
  type: "StructuredText";
  config:
    | {
        label: string;
        single: string;
      }
    | {
        label: string;
        multi: string;
      };
}

export interface NumberField {
  type: "Number";
  config: {
    label: string;
  };
}

export interface SelectField {
  type: "Select";
  config: {
    label: string;
    options: string[];
    default_value?: string;
  };
}

export interface LinkField {
  type: "Link";
  config: {
    label: string;
    select: null;
  };
}

export interface ImageField {
  type: "Image";
  config: {
    label: string;
    constraint: {
      width?: number;
      height?: number;
    };
    thumbnails: unknown[];
  };
}

export interface GroupField<T extends string = string> {
  type: "Group";
  config: {
    label: string;
    fields: {
      [key in T]:
        | UIDField
        | StructuredTextField
        | NumberField
        | SelectField
        | LinkField
        | ImageField;
    };
  };
}
