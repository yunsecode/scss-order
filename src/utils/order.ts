import { splitTextWithDelimiter } from './splitText';
import { setOrderArray } from './orderList';
import { Config } from '../interfaces/config';

function reOrderArray(orderListArr: string[], text: string[], startCheck: number, endCheck: number): void {
    const newArr: string[] = [];
    const reorderedProperties: string[] = [];

    for (let i = startCheck + 1; i < endCheck; i++) {
        newArr.push(text[i]);
    }

    orderListArr.forEach((orderItem) => {
        const foundIndex = newArr.findIndex((property) => property.trim().startsWith(orderItem + ':'));

        if (foundIndex !== -1) {
            reorderedProperties.push(newArr[foundIndex]);
            newArr.splice(foundIndex, 1);
        }
    });

    const finalProperties = reorderedProperties.concat(newArr);

    let x = 0;
    for (let i = startCheck + 1; i < endCheck; i++) {
        text[i] = finalProperties[x];
        x++;
    }
}

export function orderProperties(config: Config, filestring: string): string[] {
    const splitTable = splitTextWithDelimiter(filestring);
    const orderListArr = setOrderArray(config);

    let i = 0;

    while (i < splitTable.length) {
        let next = i + 1;
        let startCheck = 0;
        let endCheck = 0;

        // Check between where do I have to sort
        if (splitTable[i].includes('{')) {
            startCheck = i;
            while (next < splitTable.length) {
                if (splitTable[next].includes('{') || splitTable[next].includes('}')) {
                    endCheck = next;
                    i = next - 1;
                    break;
                }
                next++;
            }
        }

        // Sort
        if (endCheck - startCheck > 2) {
            reOrderArray(orderListArr, splitTable, startCheck, endCheck);
        }
        i++;
    }
    return splitTable;
}
