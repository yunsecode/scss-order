import * as fs from 'fs';
import * as path from 'path';

import { Config } from '../utils';
import { orderProperties } from '../utils';
import { formatProperties } from '../utils';
import { getConfig } from './getConfig';
import { ERR_MSG_HEADER } from '../utils/constant';
import { orderCheck } from '../utils/orderCheck';

function  getFileInfo(filePath: string): Promise<string | null> {
    return new Promise((resolve) => {
        fs.stat(filePath, (error: NodeJS.ErrnoException | null, stats: fs.Stats | undefined) => {
            if (error) {
                resolve(null);
            }

            if (stats && stats.isFile()) {
                if (path.extname(filePath) === '.scss') {
                    fs.readFile(filePath, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
                        if (err) {
                            resolve(null);
                        }

                        resolve(data);
                    });
                } else {
                    resolve(null);
                }
            } else {
                resolve(null);
            }
        });
    });
}

async function setPage(filePath:string, textToWrite: string): Promise<void> {
    fs.writeFile(filePath, textToWrite, (err) => {
        if (err) {
            throw(err);
        }
    });
}

async function parseDirectory(config: Config): Promise<void> {
    const directoryPath: string = './';

    try {
        const files: string[] = await fs.promises.readdir(directoryPath);

        for (const file of files) {
            const filePath: string = path.join(directoryPath, file);

            const fileData: string | null = await getFileInfo(filePath);
            if (!fileData) {
                continue;
            }
            const res: string[] = orderProperties(config, fileData);
            const asd: string = formatProperties(config, res);
            setPage(filePath, asd);

        }
    } catch (err) {
        console.error(ERR_MSG_HEADER, err);
    }
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
    await parseDirectory(config);
}
