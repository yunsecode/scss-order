import { splitTextWithDelimiter } from './splitText';

export function orderCheck(fileContent: string): boolean {
    const asd = splitTextWithDelimiter(fileContent);
    console.log(asd);

    return true;
}
