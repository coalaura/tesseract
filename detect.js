import { Tesseract } from "./tesseract.js";

import os from "os";

const tesseract = new Tesseract();

await tesseract.initialize(os.cpus().length);

export async function detect(pRequest, pResponse) {
    const { image } = pRequest.files;

    if (!image) {
        return pResponse.sendStatus(400);
    }

    if (!/^image/.test(image.mimetype)) {
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

        pResponse.json(data);
    } catch (pError) {
        console.log(pError);

        pResponse.sendStatus(500);
    }
}