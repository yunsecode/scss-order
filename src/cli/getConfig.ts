import * as fs from 'fs';

import { Config } from '../utils';

import { ERR_MSG_HEADER } from '../utils/constant';

export function getConfig(rawArguments = process.argv.slice(2)): Config {
    const config: Config = {
        orderList: [],
        tabSize: 4,
        spaceBeforeClass: true,
    };

    const configIndex: number = rawArguments.indexOf('--config');
    if (configIndex === -1) {
        return config;
    }
    const configFile: string = rawArguments[configIndex + 1];

    fs.readFile(configFile, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
            console.error(ERR_MSG_HEADER, 'Given file not found');
            return;
        }

        let tmpConfigFileData;

        try {
            tmpConfigFileData = JSON.parse(data);
        } catch {
            console.error(ERR_MSG_HEADER, 'Given config file is not a JSON file');
            return;
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
    });

    return config;
}
