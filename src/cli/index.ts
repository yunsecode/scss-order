import * as fs from 'fs';
import * as path from 'path';
import chalk = require('chalk');

import { Config } from '../utils';
import { orderProperties } from '../utils';
import { formatProperties } from '../utils';
import { getConfig } from './getConfig';
import { orderCheck } from '../utils/orderCheck';

const RUNNING_TEXT = ' RUNS ';
const RUNNING = `${chalk.reset.inverse.yellow.bold(RUNNING_TEXT)}`;

const FAIL_TEXT = ' FAIL ';
const FAIL = `${chalk.reset.inverse.red.bold(FAIL_TEXT)}`;

const PASS_TEXT = ' PASS ';
const PASS = `${chalk.reset.inverse.green.bold(PASS_TEXT)}`;

async function setPage(filePath:string, textToWrite: string): Promise<void> {
    fs.writeFile(filePath, textToWrite, (err) => {
        if (err) {
            throw(err);
        }
    });
}

async function findScssFiles(dir: string, allScssFiles: string[] = []): Promise<string[]> {
    const dirents = await fs.promises.readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const res = path.resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            await findScssFiles(res, allScssFiles);
        } else if (res.endsWith('.scss')) {
            allScssFiles.push(res);
        }
    }
    return allScssFiles;
}

function drawProgressBar(percentage: number): void {
    const total = 20;
    const progressLength = Math.floor(percentage / 100 * total);
    const progressBar = chalk.green('█').repeat(progressLength) + chalk.white('░').repeat(total - progressLength);
    process.stdout.write(`\r[${progressBar}] ${percentage}%`);
}

async function orderAllFiles(config: Config): Promise<void> {
    const styleFileList: string[] = await findScssFiles('.');

    const currentDirPath = process.cwd();

    let orderNum = 0;
    const startTime: Date = new Date(); // 시작 시간 기록

    if (config.showDetail) {
        for (const styleFilePath of styleFileList) {
            const filePath = styleFilePath.replace(currentDirPath, '');
            console.log(RUNNING, chalk.gray(path.dirname(filePath).slice(1) + '/') +path.basename(filePath));
        }
    }
    for (const styleFilePath of styleFileList) {
        const index = styleFileList.indexOf(styleFilePath);
        const goUp = styleFileList.length - index;

        try {
            const fileData = await fs.promises.readFile(styleFilePath, 'utf8');
            const res: string[] = orderProperties(config, fileData);
            const asd: string = formatProperties(config, res);
            setPage(styleFilePath, asd);
            if (config.showDetail) {
                process.stdout.write('\r\x1b[A'.repeat(goUp));
                process.stdout.write(PASS);
                process.stdout.write('\n'.repeat(goUp));
                orderNum += 1;
            }
        } catch (error) {
            if (config.showDetail) {
                process.stdout.write('\r\x1b[A'.repeat(goUp));
                process.stdout.write(FAIL);
                process.stdout.write('\n'.repeat(goUp));
            }
        } finally {
            if (config.showDetail) {
                process.stdout.write('\x1b[2K');
                drawProgressBar((index + 1) / styleFileList.length * 100);
            }
        }
    }
    if (config.showDetail) {
        process.stdout.write('\x1b[2K\r\n');
        const endTime: Date = new Date(); // 종료 시간 기록
        const elapsedTime: number = endTime.getTime() - startTime.getTime();
        const elapsedTimeSec = Math.round((elapsedTime / 1000) * 100) / 100;

        console.log('Order Files:\t' + chalk.green(`${orderNum} passed`) +  ` ${styleFileList.length} total`);
        console.log('Time:\t\t' + elapsedTimeSec + 's');
    }

    // process.stdout.write('\n');
}

export async function run(args = process.argv.slice(2)): Promise<void> {
    const config: Config = await getConfig(args);
    const configIndex: number = args.indexOf('--orderCheck=true');

    if (configIndex !== -1) {
        try {
            await orderCheck(config);
        } catch (err) {
            console.error(`Order check failed in ${err} file.`);
            process.exit(1);

        }
        return;
    }
    await orderAllFiles(config);
    // await parseDirectory(config);
}
