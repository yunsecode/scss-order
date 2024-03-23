import { Config } from '../interfaces/config';

const defaultOrder: string[] = [
    'position',
    'z-index',
    'top',
    'right',
    'bottom',
    'left',
    'margin',
    'margin-top',
    'margin-right',
    'margin-bottom',
    'margin-left',
    'border',
    'border-width',
    'border-radius',
    'border-color',
    'width',
    'height',
    'display',
    'flex-direction',
    'flex-shrink',
    'flex-wrap',
    'justify-content',
    'align-items',
    'background-color',
    'padding',
    'padding-top',
    'padding-right',
    'padding-bottom',
    'padding-left',
    'color',
    'font-family',
    'font-weight',
    'font-size',
];

export function setOrderArray(config: Config): string[] {
    const new_arr: string[] = [...config.orderList];

    for (const item of defaultOrder) {
        if (!config.orderList.includes(item)) {
            new_arr.push(item);
        }
    }

    return new_arr;
}
