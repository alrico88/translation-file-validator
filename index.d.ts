export = TranslationChecker;
/**
 * Helper to check multiple translation files for missing keys between them
 * Logs output as a table in the console
 *
 * @class TranslationChecker
 */
declare class TranslationChecker {
    /**
     * Compares translation files to see which keys are missing from each other
     *
     * @static
     * @private
     * @param {ComparatorArray[]} arrays
     * @return {ComparatorResult[]}
     * @memberof TranslationChecker
     */
    private static arrayComparator;
    /**
     * Gets all keys recursively from object
     *
     * @static
     * @private
     * @param {object} obj
     * @param {string} [prefix='']
     * @return {string[]}
     * @memberof TranslationChecker
     */
    private static getAllKeysRecursive;
    /**
     * Creates an instance of TranslationChecker.
     * @param {TranslationFile[]} files
     * @memberof TranslationChecker
     */
    constructor(files: TranslationFile[]);
    files: TranslationFile[];
    /**
     * Compares translation files to see which keys are missing from each other
     *
     * @returns {void}
     * @memberof TranslationChecker
     */
    check(): void;
}
declare namespace TranslationChecker {
    export { TranslationChecker, TranslationFile };
}
import TranslationFile = require("./models/TranslationFile");
