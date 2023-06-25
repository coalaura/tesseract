import { cpus } from "os";

import { Tesseract } from "./tesseract.js";
import { log } from "./log.js";

const tesseract = new Tesseract();

await tesseract.initialize(cpus().length);

export async function detect(pRequest, pResponse) {
    const { image } = pRequest.files;

    if (!image) {
        log(pRequest, 400, "No image provided");

        return pResponse.sendStatus(400);
    }

    if (!/^image/.test(image.mimetype)) {
        log(pRequest, 400, "Invalid image sent");

        return pResponse.sendStatus(400);
    }

    const base64 = image.data.toString("base64");

    const dataUrl = `data:${image.mimetype};base64,${base64}`;

    const minConfidence = pRequest.query.confidence ? parseFloat(pRequest.query.confidence) : false;

    try {
        const data = await tesseract.detect(dataUrl);

        if (minConfidence) {
            data.words = data.words.filter(pWord => pWord.confidence >= minConfidence);
        }

        log(pRequest, 200, `Detected ${data.words.length} words`);

        pResponse.json(data);
    } catch (pError) {
        log(pRequest, 500, pError.message);

        pResponse.sendStatus(500);
    }
}