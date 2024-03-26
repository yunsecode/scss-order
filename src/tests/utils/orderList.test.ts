import { setOrderArray } from '../../utils/orderList';
import { Config } from '../../interfaces/config';


// =============================================================
// ====================== Test OrderArray ======================
// =============================================================

// TODO: not existed properties

// Config order List
test('setOrderArray with orderList in config ', () => {
    const config: Config = {
        orderList: ['display', 'width'],
        tabSize: 1,
        spaceBeforeClass: false,
        insertFinalNewline: true
    };

    const expectedResult = [
        'display',
        'width',
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
        'height',
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

    expect(setOrderArray(config)).toStrictEqual(expectedResult);
});

// Don't config order List
test('setOrderArray with empty orderList', () => {
    const config: Config = {
        orderList: [],
        tabSize: 1,
        spaceBeforeClass: false,
        insertFinalNewline: true
    };

    const expectedResult = [
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

    expect(setOrderArray(config)).toStrictEqual(expectedResult);
});
