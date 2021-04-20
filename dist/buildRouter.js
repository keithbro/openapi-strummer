"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@luxuryescapes/router");
const express_1 = __importDefault(require("express"));
function default_1(schemas) {
    const router = router_1.router(express_1.default(), {
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
    schemas.forEach(({ url, method, schema }) => router[method]({ url, schema, handlers: [] }));
    return router;
}
exports.default = default_1;
