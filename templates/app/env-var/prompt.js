const { readdirSync } = require("fs");

module.exports = [
  {
    type: "select",
    name: "app",
    message: "Which app is this variable for?",
    choices: readdirSync("apps"),
  },
  {
    type: "select",
    name: "prefix",
    message:
      "Add `NEXT_PUBLIC_` prefix? (i.e. allow variable to be accessed in browser)",
    choices: ["NEXT_PUBLIC_", ""],
    choiceMessage: (choice) => (choice.value === "NEXT_PUBLIC_" ? "Yes" : "No"),
  },
  {
    type: "input",
    name: "name",
    message: "What is the name of the variable?",
    validate: (value) =>
      /next_public/i.test(value)
        ? "NEXT_PUBLIC_ will be added automatically"
        : true,
  },
  {
    type: "input",
    name: "defaultValue",
    message: "What should the default value be for local development?",
    footer:
      "This value will be committed. Leave this empty if the value is sensitive.",
  },
];
