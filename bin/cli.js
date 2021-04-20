#!/usr/bin/env node

"use strict";

const path = require("path");
const fs = require("fs");
const openapiTS = require("openapi-typescript").default;
const { generate } = require("openapi-typescript-codegen");
const buildRouter = require("../dist/buildRouter").default;

const spec = "./openapi.json";
const types = "./src/generated/openapi.ts";

const relativeSchemasFile = process.argv[2];
const outPath = process.argv[3];

if (!relativeSchemasFile || !outPath) console.log(usage());

const schemasFile = path.resolve(process.cwd(), relativeSchemasFile);
if (!fs.existsSync(schemasFile)) {
  console.log(`Could not find file: ${relativeSchemasFile}`);
  process.exit(1);
}

const schemas = require(schemasFile);
const router = buildRouter(schemas);

const swagger = router.toSwagger();
const swaggerJSON = JSON.stringify(swagger, null, 2);
const swaggerTS = openapiTS(swagger);

fs.writeFileSync(spec, swaggerJSON);
fs.writeFileSync(types, swaggerTS);

generate({
  input: swagger,
  output: outPath,
});

function usage() {
  console.log("Usage: yarn openapi schema.js src/generated");
  process.exit(1);
}
