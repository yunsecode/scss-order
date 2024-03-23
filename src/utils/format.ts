import { Config } from '../interfaces/config';

function addSpacesToBeginning(input: string, count: number): string {
    if (count <= 0) {
        return input;
    }
    const spaces = ' '.repeat(count);
    return spaces + input;
}

export function formatProperties(config: Config, propertieslist: string[]): string {
    let newText = propertieslist[0];
    let tabNum = 0;

    for (let i = 1; i < propertieslist.length; i++) {
        if (propertieslist[i - 1].includes('{')) {
            newText += '\n';
            newText += addSpacesToBeginning(propertieslist[i], (tabNum + 1) * config.tabSize);
            tabNum++;
        } else if (propertieslist[i] === '}') {
            newText += '\n';
            newText += addSpacesToBeginning(propertieslist[i], (tabNum - 1) * config.tabSize);
            tabNum = tabNum - 1;
        } else if (propertieslist[i].includes('{')) {
            if (config.spaceBeforeClass) {
                newText += '\n';
            }
            newText += '\n';
            newText += addSpacesToBeginning(propertieslist[i], tabNum * config.tabSize);
        } else {
            newText += '\n';
            newText += addSpacesToBeginning(propertieslist[i], tabNum * config.tabSize);
        }
    }
    newText += '\n';

    return newText;
}
