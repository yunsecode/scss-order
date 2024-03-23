function splitPerLine(resultArr: string[], input: string): void {
    let currentIndex: number = 0;

    for (let i = 0; i < input.length; i++) {
        if (input[i] === '{' || input[i] === ';' || input[i] === '}') {
            const substring: string = input.substring(currentIndex, i + 1).trim();

            if (substring !== '') {
                resultArr.push(substring);
            }
            currentIndex = i + 1;
        }
    }

    if (currentIndex < input.length) {
        const substring: string = input.substring(currentIndex).trim();

        if (substring !== '') {
            resultArr.push(substring);
        }
    }
}

export function splitTextWithDelimiter(text: string): string[] {
    const lines: string[] = text.split('\n');
    const resultArr: string[] = [];

    for (const line of lines) {
        splitPerLine(resultArr, line);
    }

    return resultArr;
}
