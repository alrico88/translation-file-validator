const {TranslationChecker, TranslationFile} = require('../index');

const es = {
  hello: 'world',
  nested: {
    existing: 'both',
    missing: 'other',
  },
};

const en = {
  goodbye: 'world',
  nested: {
    existing: 'both',
  },
};

describe('Test main function', () => {
  test('It should report missing translations successfully', () => {

    const languages = [
      new TranslationFile('Spanish', es),
      new TranslationFile('English', en),
    ];
    const checker = new TranslationChecker(languages);
    expect(() => {
      checker.check();
    }).not.toThrow();
  });
});
