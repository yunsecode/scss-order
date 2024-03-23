import * as fs from 'fs';

import { Config } from '../utils';

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
            // TODO: do smth
        }

        // check if there is an error here
        const configFileData: Config = JSON.parse(data);

        if (configFileData.orderList) {
            config.orderList = configFileData.orderList;
        }
        if (configFileData.tabSize) {
            config.tabSize = configFileData.tabSize;
        }
        if (configFileData.spaceBeforeClass) {
            config.spaceBeforeClass = configFileData.spaceBeforeClass;
        }

    });

    return config;
}
