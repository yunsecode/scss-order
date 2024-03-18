import * as fs from 'fs';
import * as path from 'path';

import { Config } from '../utils';
import { orderProperties } from '../utils';
import { formatProperties } from '../utils';

function  getFileInfo(filePath: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
        fs.stat(filePath, (error: NodeJS.ErrnoException | null, stats: fs.Stats | undefined) => {
            if (error) {
                console.error('Error stating file.', error);
                resolve(null);
            }

            // 파일인지 확인
            if (stats && stats.isFile()) {
                // 확장자가 .scss 인지 확인
                if (path.extname(filePath) === '.scss') {
                    // SCSS 파일 읽기
                    fs.readFile(filePath, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
                        if (err) {
                            console.error('Error reading file.', err);
                            resolve(null);
                        }

                        resolve(data);
                    });
                }
            }
        });
    });
}

const config:Config = {
    orderList: ["display"],
    changeOnSave: true,
    showErrorMessages: false,
    autoFormat: true,
    tabSize: 4,
    spaceBeforeClass: true,
}

async function setPage(filePath:string, textToWrite: string) {
    fs.writeFile(filePath, textToWrite, (err) => {
        if (err) {
            console.error('Error writing file:', err);
        }
    });
}

async function parseDirectory() {
    const directoryPath: string = './'; // 현재 디렉토리

    try {
        const files = await fs.promises.readdir(directoryPath);

        // 모든 파일에 대해 반복
        for (const file of files) {
            // 파일 경로 생성
            const filePath: string = path.join(directoryPath, file);

            // 파일 정보 가져오기
            const fileData = await getFileInfo(filePath);
            if (!fileData) {
                continue
            }
            // console.log("fileData", fileData);
            const res = orderProperties(config, fileData)
            const asd = formatProperties(config, res)
            setPage(filePath, asd)

        }
    } catch (err) {
        console.error('Unable to scan directory: ' + err);
    }
}

export async function run() {
    // Get config
    await parseDirectory();
}
