export = ComparatorResult;
declare class ComparatorResult {
    /**
     * Creates an instance of ComparatorResult.
     * @param {string} name Name of the array
     * @param {string[]} keys Array of strings that are only found in this array
     * @memberof ComparatorResult
     */
    constructor(name: string, keys: string[]);
    arrayName: string;
    uniqueKeys: string[];
}
