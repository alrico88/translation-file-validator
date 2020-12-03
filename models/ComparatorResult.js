class ComparatorResult {

  /**
   * Creates an instance of ComparatorResult.
   * @param {string} name Name of the array
   * @param {string[]} keys Array of strings that are only found in this array
   * @memberof ComparatorResult
   */
  constructor(name, keys) {
    this.arrayName = name;
    this.uniqueKeys = keys;
  }
}

module.exports = ComparatorResult;
