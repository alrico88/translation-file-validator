const {TranslationChecker, TranslationFile} = require('../index');

const es = {
  hola: 'mundo',
  nested: {
    existing: 'both',
    missing: 'falta',
    contentAsArray: ['hola'],
  },
};

const en = {
  goodbye: 'world',
  nested: {
    existing: 'both',
    contentAsArray: ['hello'],
    deepNest: {
      missingToo: 'missing',
    },
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
