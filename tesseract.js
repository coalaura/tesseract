import { createWorker, createScheduler } from "tesseract.js";

export class Tesseract {
    async initialize(pWorkerCount) {
        this.scheduler = createScheduler();

        for (let i = 0; i < pWorkerCount; i++) {
            const worker = await createWorker({
                logger: () => {},
                errorHandler: () => {}
            });

            await worker.loadLanguage("eng");
            await worker.initialize("eng");

            await worker.setParameters({
                preserve_interword_spaces: 1,

                tessedit_char_whitelist: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ "
            });

            this.scheduler.addWorker(worker);
        }
    }

    async detect(pImage) {
        const { data } = await this.scheduler.addJob("recognize", pImage);

        if (!data) {
            return false;
        }

        const words = data.words.map(pWord => {
            const { text, confidence, bbox } = pWord;

            return {
                text,
                confidence,
                bbox
            };
        }).filter(pWord => pWord.text.length > 1 && pWord.confidence > 0);

        return {
            text: data.text,
            words: words
        };
    }
}