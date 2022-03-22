export function createIndent(indentAmount: number) {
  const indent = " ".repeat(indentAmount);
  return (line: string) => indent + line;
}

export function indent(data: string, indentAmount: number) {
  return data.split("\n").map(createIndent(indentAmount)).join("\n");
}
