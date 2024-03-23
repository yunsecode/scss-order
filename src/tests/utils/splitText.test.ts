import { splitTextWithDelimiter } from '../../utils/splitText';

// =============================================================
// ====================== Test OrderArray ======================
// =============================================================

// TODO: if no text

// 1 property in line
test('splitTextWithDelimiter 1 property in line', () => {
    const text: string ='width: 100px;\nheight: 100px';

    const expectedResult: string[] = [
        'width: 100px;',
        'height: 100px'
    ];
    expect(splitTextWithDelimiter(text)).toStrictEqual(expectedResult);
});

// 2 properties in line
test('splitTextWithDelimiter 2 properties in one line', () => {
    const text: string ='width: 100px;height: 100px';

    const expectedResult: string[] = [
        'width: 100px;',
        'height: 100px'
    ];
    expect(splitTextWithDelimiter(text)).toStrictEqual(expectedResult);
});
