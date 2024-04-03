export interface Config {
    orderList: string[];
    tabSize: number;
    spaceBeforeClass: boolean;
    insertFinalNewline: boolean;
    changeOnSave?: boolean; // TODO:
    autoFormat?: boolean; // TODO:
    showDetail?: boolean;
    // 그냥 클래스, :hover 이런 순서
}
