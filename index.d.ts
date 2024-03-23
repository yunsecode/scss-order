/* eslint-disable */

import { Config } from './src/interfaces/config';

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
