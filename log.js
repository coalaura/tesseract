import chalk from "chalk";

export function log(pRequest, pStatus, pMessage) {
    const prefix = chalk.gray(`[${date()}] ${pRequest.clientIp} -`);

    const statusGroup = Math.floor(pStatus / 100);

    if (statusGroup === 1 || statusGroup === 2 || statusGroup === 3) {
        console.log(`${prefix} ${chalk.green(pStatus)} ${pMessage}`);
    } else if (statusGroup === 4) {
        console.log(`${prefix} ${chalk.yellow(pStatus)} ${pMessage}`);
    } else {
        console.log(`${prefix} ${chalk.red(pStatus)} ${pMessage}`);
    }
}

function date() {
    const d = new Date();

    return `${pad(d.getMonth() + 1)}/${pad(d.getDate())} - ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

function pad(pNumber) {
    if (pNumber < 10) return "0" + pNumber;;

    return pNumber;
}
