import orderProperties from '../../utils/order';
import { Config } from '../../interfaces/config';


// =============================================================
// ======================== Order Test  ========================
// =============================================================

// Set orderList
test('orderProperties order properties with ', () => {
    const config: Config = {
        orderList: ['display', 'width'],
        tabSize: 1,
        spaceBeforeClass: false,
        insertFinalNewline: true,
    };

    const filestring: string =
`
.asd {
    width: 100px;
    display: flex;
}
`.slice(1);

    const expectedResult = [
        '.asd {',
        'display: flex;',
        'width: 100px;',
        '}'
    ];

    expect(orderProperties(config, filestring)).toStrictEqual(expectedResult);
});

// Don't set orderList with order
test('orderProperties order properties with ', () => {
    const config: Config = {
        orderList: [],
        tabSize: 1,
        spaceBeforeClass: false,
        insertFinalNewline: true,
    };

    const filestring: string =
`
.asd {
    width: 100px;
    display: flex;
}
`.slice(1);

    const expectedResult = [
        '.asd {',
        'width: 100px;',
        'display: flex;',
        '}'
    ];

    expect(orderProperties(config, filestring)).toStrictEqual(expectedResult);
});

// Don't set orderList without order
test('orderProperties order properties with ', () => {
    const config: Config = {
        orderList: [],
        tabSize: 1,
        spaceBeforeClass: false,
        insertFinalNewline: true,
    };

    const filestring: string =
`
.asd {
    display: flex;
    width: 100px;
}
`.slice(1);

    const expectedResult = [
        '.asd {',
        'width: 100px;',
        'display: flex;',
        '}'
    ];

    expect(orderProperties(config, filestring)).toStrictEqual(expectedResult);
});
