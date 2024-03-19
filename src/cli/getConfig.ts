import { Config } from "../utils";

export function getConfig(rawArguments = process.argv.slice(2)): Config {
    let config: Config = {
        orderList: [],
        tabSize: 2,
        spaceBeforeClass: true,
    }

    // console.log(rawArguments);
    return config;
}
