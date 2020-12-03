const Table = require('cli-table3');
const {difference, flatten, uniq} = require('lodash');
const chalk = require('chalk');
const TranslationFile = require('./models/TranslationFile');
const ComparatorResult = require('./models/ComparatorResult');
const ComparatorArray = require('./models/ComparatorArray');

/**
 * Helper to check multiple translation files for missing keys between them
 * Logs output as a table in the console
 *
 * @class TranslationChecker
 */
class TranslationChecker {

  /**
   * Creates an instance of TranslationChecker.
   * @param {TranslationFile[]} files
   * @memberof TranslationChecker
   */
  constructor(files) {
    this.files = files;
  }

  /**
   * Compares translation files to see which keys are missing from each other
   *
   * @static
   * @private
   * @param {ComparatorArray[]} arrays
   * @return {ComparatorResult[]}
   * @memberof TranslationChecker
   */
  static arrayComparator(arrays) {
    const differences = {};

    arrays.forEach(({name}) => {
      differences[name] = [];
    });

    arrays.forEach(({name, content}) => {
      arrays.forEach(({content: compareContent}) => {
        differences[name].push(...difference(content, compareContent));
      });
    });

    return Object.entries(differences).map(([key, value]) => new ComparatorResult(key, value));
  }

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
  static getAllKeysRecursive(obj, prefix = '') {
    return Object.keys(obj).reduce((res, el) => {
      if (Array.isArray(obj[el])) {
        return res;
      } else if (typeof obj[el] === 'object' && obj[el] !== null) {
        return [
          ...res,
          ...TranslationChecker.getAllKeysRecursive(obj[el], prefix + el + '.'),
        ];
      }

      return [...res, prefix + el];
    }, []);
  }

  /**
   * Compares translation files to see which keys are missing from each other
   *
   * @returns {void}
   * @memberof TranslationChecker
   */
  check() {
    const asComparatorArray = this.files.map(({language, content}) =>
        new ComparatorArray(
          language,
          TranslationChecker.getAllKeysRecursive(content),
        ));
    const unmatchedKeys = TranslationChecker.arrayComparator(asComparatorArray);

    const summaryTable = new Table({
      head: ['Language', 'Missing translation keys'],
    });

    function getMissingContentText(missingContent) {
      const flattened = flatten(missingContent);

      return flattened.length > 0
        ? chalk.yellow(uniq(flattened).join('\n'))
        : chalk.green('All strings are OK');
    }

    unmatchedKeys.forEach(({arrayName}) => {
      const missingContent = unmatchedKeys
        .filter((d) => d.arrayName !== arrayName)
        .map((d) => d.uniqueKeys);

      summaryTable.push([arrayName, getMissingContentText(missingContent)]);
    });

    // eslint-disable-next-line no-console
    console.log(summaryTable.toString());
  }
}

module.exports = TranslationChecker;
module.exports.TranslationChecker = TranslationChecker;
module.exports.TranslationFile = TranslationFile;
