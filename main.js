import { detect } from "./detect.js";

import express from "express";
import { createServer } from "http";
import cors from "cors";
import fileUpload from "express-fileupload";

import "dotenv/config";

const app = express(),
    server = createServer(app);

app.use(cors({
    origin: '*'
}));

app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);

app.post("/detect", detect);

const port = process.env.PORT || 9999;

server.listen(port, () => {
    console.log(`Server started on ${port}`);
});