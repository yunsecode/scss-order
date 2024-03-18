import { Config } from "./src/interfaces/config";

export { Config };

export declare function orderProperties(
  config: Config,
  filestring: string
): string[];

export declare function formatProperties(
  config: Config,
  propertieslist: string[]
): string;

export declare function setOrderArray(config: Config): string[];

// declare module "scss-order" {
//   export function orderProperties(css: string): string;
//   export { OriginalInterface } from "src/interfaces/config";

//   // 다른 함수나 타입 정의도 필요한 경우 추가
// }
