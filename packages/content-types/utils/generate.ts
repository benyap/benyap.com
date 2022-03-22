import { writeFileSync } from "fs";
import { config } from "dotenv";
import { bold, yellow } from "ansi-colors";
import axios from "axios";

import type { ContentTypeDefinition, ContentTypeField } from "../static";

import { Logger } from "./log";
import { createDirectory } from "./file";
import { indent, createIndent } from "./indent";

async function main() {
  // Get variables
  config();
  const REPOSITORY = process.env.PRISMIC_REPOSITORY ?? "";
  const ACCESS_TOKEN = process.env.PRISMIC_ACCESS_TOKEN ?? "";

  // Create request client
  const client = axios.create({
    baseURL: `https://customtypes.prismic.io`,
    headers: {
      repository: REPOSITORY,
      authorization: `Bearer ${ACCESS_TOKEN}`,
    },
  });

  // Fetch custom types
  const response = await client.get<ContentTypeDefinition[]>("customtypes");
  const definitions = response.data;
  const length = yellow(definitions.length.toString());
  Logger.success(`Fetched ${length} types from repository ${bold(REPOSITORY)}`);

  // Create directories
  createDirectory("generated/definitions");

  // Generate definitions
  const definitionFiles = generateDefinitionFiles(definitions);

  // Write the files
  writeFileSync(`generated/mappings.ts`, generateMappingsFile(definitions));
  writeFileSync(
    `generated/index.ts`,
    generateIndexFile(definitions, [`export * from "./mappings";`])
  );
  Object.keys(definitionFiles).forEach((file) =>
    writeFileSync(`generated/definitions/${file}.ts`, definitionFiles[file])
  );

  Logger.success(`Generated content types for ${bold(REPOSITORY)}`);
}

main();

// --- HELPER METHODS ---

function fieldToString(field: ContentTypeField, imports: Set<string>) {
  if (field.type === "StructuredText") {
    // ASSUMPTION: if a text field only contains a single heading type, it's a title field
    // Making this assumption because Prismic returns all text fields as "StructuredText"
    if ("single" in field.config && field.config.single.match(/^heading\d$/)) {
      imports.add("TitleField");
      return `TitleField`;
    }
    imports.add("RichTextField");
    return `RichTextField`;
  }

  if (field.type === "UID") {
    imports.add("CustomTypeModelUIDField");
    return "CustomTypeModelUIDField";
  }

  // TODO: add support for more custom fields as they are used in the project

  if (field.type === "Group") {
    imports.add("GroupField");
    const fields: string = Object.keys(field.config.fields)
      .map((name) => `${name}: ${fieldToString(field.config.fields[name], imports)};`)
      .join("\n");
    return `GroupField<{
${indent(fields, 2)}
}>`;
  }

  const fieldName = `${field.type}Field`;
  imports.add(fieldName);

  return fieldName;
}

function generateDefinitionFiles(definitions: ContentTypeDefinition[]): Record<string, string> {
  const definitionFiles: Record<string, string> = {};

  for (const definition of definitions) {
    const { id, label, repeatable, json } = definition;
    const name = label.replace(/ /g, "");

    const imports = new Set<string>();
    const customImports = new Set<string>();

    const fields = Object.keys(json)
      .map((section) => Object.keys(json[section]).map((key) => [section, key] as const))
      .flat()
      .map(([section, key]) => {
        const field = json[section][key];
        return `${key}: ${fieldToString(field, imports)};`;
      })
      .join("\n");

    const importString = [
      Array.from(imports).map((field) => `import { ${field} } from "@prismicio/types";`),
      Array.from(customImports).map((field) => `import { ${field} } from "../../static";`),
    ]
      .flat()
      .join("\n");

    definitionFiles[name] = `${importString}

export interface ${name} {
  id: "${id}";
  label: "${label}";
  repeatable: ${String(repeatable)};
  json: {
${indent(fields, 4)}
  };
}

export const ${name}Definition = ${JSON.stringify(definition, null, 2)}
`;
  }

  return definitionFiles;
}

function generateMappingsFile(definitions: ContentTypeDefinition[]): string {
  const names = definitions.reduce((map, d) => {
    map[d.id] = d.label.replace(/ /g, "");
    return map;
  }, {} as Record<string, string>);

  const singles = definitions.filter((d) => d.repeatable === false);
  const repeatables = definitions.filter((d) => d.repeatable === true);

  return `${definitions
    .map(
      (d) =>
        `import { ${names[d.id]}, ${names[d.id]}Definition } from "./definitions/${names[d.id]}";`
    )
    .join("\n")}

export type ContentTypeMapping = SingleContentTypeMapping | RepeatableContentTypeMapping;

export interface SingleContentTypeMapping {
${singles
  .map((d) => `${d.id}: ${names[d.id]};`)
  .map(createIndent(2))
  .join("\n")}
}

export interface RepeatableContentTypeMapping {
${repeatables
  .map((d) => `${d.id}: ${names[d.id]};`)
  .map(createIndent(2))
  .join("\n")}
}

export const ContentTypeDefinitions = [
${definitions
  .map((d) => `${names[d.id]}Definition,`)
  .map(createIndent(2))
  .join("\n")}
];
`;
}

function generateIndexFile(
  definitions: ContentTypeDefinition[],
  additionalExports: string[] = []
): string {
  const names = definitions.map((d) => d.label.replace(/ /g, ""));
  return names
    .map((name) => `export * from "./definitions/${name}";`)
    .concat([""], additionalExports, [""])
    .join("\n");
}
