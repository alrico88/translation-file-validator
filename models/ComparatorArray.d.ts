export = ComparatorArray;
declare class ComparatorArray {
    /**
     * Creates an instance of ComparatorArray.
     * @param {string} name Name of the array
     * @param {object} content Content of the file
     * @memberof ComparatorArray
     */
    constructor(name: string, content: object);
    name: string;
    content: any;
}
