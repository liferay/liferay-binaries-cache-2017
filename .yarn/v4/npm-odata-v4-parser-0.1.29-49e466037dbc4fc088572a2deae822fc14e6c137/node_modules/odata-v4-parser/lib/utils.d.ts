export declare namespace Utils {
    type SourceArray = number[] | Uint16Array;
    function stringify(value: SourceArray, index: number, next: number): string;
    function is(value: number, compare: string): boolean;
    function equals(value: SourceArray, index: number, compare: string): number;
    function required(value: SourceArray, index: number, comparer: Function, min?: number, max?: number): number;
}
export default Utils;
