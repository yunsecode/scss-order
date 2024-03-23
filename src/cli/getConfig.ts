import * as fs from 'fs';

import { Config } from '../utils';

export function getConfig(rawArguments = process.argv.slice(2)): Config {
    const config: Config = {
        orderList: [],
        tabSize: 4,
        spaceBeforeClass: true,
    };

    const configIndex = rawArguments.indexOf('--config');
    const configFile = configIndex !== -1 ? rawArguments[configIndex + 1] : null;

    fs.readFile(configFile, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
        if (err) {
            // TODO: do smth
            console.log('asd');

        }

        const configFileData = JSON.parse(data);

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
