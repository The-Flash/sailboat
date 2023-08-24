import { Express } from "express";

import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const docsFile = YAML.load("./src/docs/specs.yaml");

export function swaggerDocs(app: Express) {
    app.use(
        "/docs",
        swaggerUi.serve,
        swaggerUi.setup(docsFile, { explorer: true })
    )
}