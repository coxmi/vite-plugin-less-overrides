import type { Plugin } from 'vite';
export type Paths = string | string[]
export declare function less(paths?: Paths): Plugin[];
export default less