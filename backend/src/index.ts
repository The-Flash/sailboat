import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { createServer } from "http";
import { todoRouter } from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import helmet from "helmet";
import { swaggerDocs } from "./swagger";

dotenv.config();

const port = process.env.PORT || 8000;

const main = () => {
    const app = express();
    app.use(morgan("dev"));
    app.use(helmet());
    app.use(cors());

    app.use(express.json());

    app.get("/", (req, res) => res.send("index"));

    app.use("/api/v1/todos", todoRouter);

    app.use(errorHandler);

    swaggerDocs(app);

    const httpServer = createServer(app);

    httpServer.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    })
}

main();