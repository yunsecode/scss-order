import { Config } from "../interfaces/config";

const defaultOrder = [
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

export function setOrderArray(config: Config) {
    const new_arr: string[] = [...config.orderList];

    // arr1에서 중복되지 않는 요소를 필터링하여 new_arr에 추가
    for (const item of defaultOrder) {
        if (!config.orderList.includes(item)) {
            new_arr.push(item);
        }
    }

    return new_arr;
}
