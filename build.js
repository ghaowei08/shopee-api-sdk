const { readFileSync, writeFileSync, copyFileSync } = require("fs");

function build() {
  copyFileSync("./README.md", "./npm/README.md");
  writeFileSync("./npm/package.json", generatePackageJson());
}

function generatePackageJson() {
  const content = readFileSync("./package.json");
  const json = JSON.parse(content.toString());
  return JSON.stringify(json, null, 2);
}

build();
