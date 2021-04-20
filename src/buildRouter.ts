import { router as buildRouter, RouteSchema } from "@luxuryescapes/router";
import express from "express";

interface Xyz {
  method: "put";
  url: string;
  schema: RouteSchema;
}

export default function (schemas: Xyz[]) {
  const router = buildRouter(express(), {
    swaggerBaseProperties: {
      swagger: "2.0",
      info: {
        description: "This is my api",
        version: "1.0.0",
        title: "My api",
        termsOfService: null,
        contact: {
          email: "hi@hi.com",
        },
      },
      host: "https://myapi.com",
      basePath: "/",
      tags: [],
      consumes: ["application/json"],
      produces: ["application/json"],
      schemes: ["https"],
      paths: {},
      securityDefinitions: {},
      definitions: {},
    },
  });

  schemas.forEach(({ url, method, schema }) =>
    router[method]({ url, schema, handlers: [] })
  );

  return router;
}
