const path = require("path");
const fs = require("fs");
const openapiTS = require("openapi-typescript").default;
const { generate } = require("openapi-typescript-codegen");
const buildRouter = require("../dist/buildRouter").default;

const spec = "./openapi.json";
const types = "./src/generated/openapi.ts";

const schemasFile = path.resolve(process.cwd(), process.argv[2]);

const schemas = require(schemasFile);
const router = buildRouter(schemas);

const swagger = router.toSwagger();
const swaggerJSON = JSON.stringify(swagger, null, 2);
const swaggerTS = openapiTS(swagger);

fs.writeFileSync(spec, swaggerJSON);
fs.writeFileSync(types, swaggerTS);

generate({
  input: swagger,
  output: "./src/generated",
});
