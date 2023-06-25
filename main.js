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

server.listen(9999, () => {
    console.log("Server started on 9999");
});