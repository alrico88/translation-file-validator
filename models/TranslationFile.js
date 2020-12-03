/**
 * Class holding a translation details
 *
 * @class TranslationFile
 */
class TranslationFile {

  /**
   * Creates an instance of TranslationFile.
   * @param {string} language Language
   * @param {object} content Object holding translations
   * @memberof TranslationFile
   */
  constructor(language, content) {
    this.language = language;
    this.content = content;
  }
}

module.exports = TranslationFile;
