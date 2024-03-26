import * as fs from 'fs';

import { Config } from '../utils';

import { ERR_MSG_HEADER } from '../utils/constant';

export async function getConfig(args: string[]): Promise<Config> {
    const config: Config = {
        orderList: [],
        tabSize: 4,
        spaceBeforeClass: true,
        insertFinalNewline: true,
    };

    const configIndex: number = args.indexOf('--config');
    if (configIndex === -1) {
        return config;
    }
    const configFile: string = args[configIndex + 1];

    const data = await fs.promises.readFile(configFile, 'utf8');

    let tmpConfigFileData;

    try {
        tmpConfigFileData = JSON.parse(data);
    } catch {
        console.error(ERR_MSG_HEADER, 'Given config file is not a JSON file');
        return config;
    }

    if (tmpConfigFileData.orderList && Array.isArray(tmpConfigFileData.orderList)) {
        config.orderList = tmpConfigFileData.orderList;
    }
    if (tmpConfigFileData.tabSize && typeof tmpConfigFileData.tabSize === 'number') {
        config.tabSize = tmpConfigFileData.tabSize;
    }
    if (typeof tmpConfigFileData.spaceBeforeClass === 'boolean') {
        config.spaceBeforeClass = tmpConfigFileData.spaceBeforeClass;
    }
    if (typeof tmpConfigFileData.insertFinalNewline === 'boolean') {
        config.insertFinalNewline = tmpConfigFileData.insertFinalNewline;
    }

    return config;
}
