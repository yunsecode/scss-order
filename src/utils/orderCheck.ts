import * as fs from 'fs';
import * as path from 'path';

import { Config } from '../utils';
import { splitTextWithDelimiter } from './splitText';
import { setOrderArray } from './orderList';

import { ERR_MSG_HEADER } from '../utils/constant';

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

function asd(filestring: string, orderList: string[]): Promise<boolean> {
    return new Promise((resolve, rejects) => {
        const splitTable: string[] = splitTextWithDelimiter(filestring);

        let index = 0;

        for (const line of splitTable) {
            if (line.includes('{') || line.includes('}')) {
                index = 0;
                continue;
            }

            const tmpIndex = orderList.indexOf(line.split(':')[0]);

            if (tmpIndex === -1) {
                continue;
            }
            if (index <= tmpIndex) {
                index = tmpIndex;
            } else {
                rejects(true);
            }
        }

        resolve(true);
    });
}


async function parseDirectory(orderList: string[]): Promise<null> {
    const directoryPath: string = './';

    try {
        const files: string[] = await fs.promises.readdir(directoryPath);

        for (const file of files) {
            const filePath: string = path.join(directoryPath, file);

            try {
                const fileData: string | null = await getFileInfo(filePath);
                if (!fileData) {
                    continue;
                }
                await asd(fileData, orderList);
            } catch (error) {
                throw(null);
            }
        }
        return null;
    } catch (err) {
        throw(null);
    }
}


export async function orderCheck(config: Config): Promise<boolean> {
    try {
        const orderListArr: string[] = setOrderArray(config);

        await parseDirectory(orderListArr);

    } catch (err) {
        return false;
    }

    return true;
}
