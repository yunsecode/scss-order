function splitPerLine(resultArr: string[], input: string): void {
    let currentIndex = 0;

    for (let i = 0; i < input.length; i++) {
        if (input[i] === '{' || input[i] === ';' || input[i] === '}') {
            const substring = input.substring(currentIndex, i + 1).trim();
            if (substring !== '') {
                resultArr.push(substring);
            }
            currentIndex = i + 1;
        }
    }

    if (currentIndex < input.length) {
        const substring = input.substring(currentIndex).trim();
        if (substring !== '') {
            resultArr.push(substring);
        }
    }
}

export function splitTextWithDelimiter(text: string): string[] {
    // 줄바꿈 문자('\n')을 기준으로 문자열을 분할
    const lines = text.split('\n');
    const resultArr: string[] = [];

    for (const line of lines) {
        splitPerLine(resultArr, line);
    }

    return resultArr;
}
