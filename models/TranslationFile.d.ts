export = TranslationFile;
/**
 * Class holding a translation details
 *
 * @class TranslationFile
 */
declare class TranslationFile {
    /**
     * Creates an instance of TranslationFile.
     * @param {string} language Language
     * @param {object} content Object holding translations
     * @memberof TranslationFile
     */
    constructor(language: string, content: object);
    language: string;
    content: any;
}
