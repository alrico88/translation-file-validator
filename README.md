# translation-checker

Script to check for missing keys in translation files

## Installation

Using yarn:

`yarn add translation-file-validator -D`

Or using npm:

`npm i translation-file-validator --save-dev`

## Usage

Given the following structure:

```javascript
const es = {
  hola: 'mundo',
  nested: {
    existing: 'both',
    missing: 'falta',
  },
};

const en = {
  goodbye: 'world',
  nested: {
    existing: 'both',
    deepNest: {
      missingToo: 'missing',
    },
  },
};
```

Create an instance of the checker and pass it an array of `TranslationFile`s with the language and the object containing the translations

```javascript
const {
  TranslationChecker,
  TranslationFile,
} = require('translation-file-validator');

const languages = [
  new TranslationFile('Spanish', es),
  new TranslationFile('English', en),
];

const checker = new TranslationChecker(languages);
```

And run it

```javascript
checker.check();
```

It will output a table in your console with the missing keys for each language:

```
┌──────────┬────────────────────────────┐
│ Language │ Missing translations       │
├──────────┼────────────────────────────┤
│ Spanish  │ goodbye                    │
│          │ nested.deepNest.missingToo │
├──────────┼────────────────────────────┤
│ English  │ hola                       │
│          │ nested.missing             │
└──────────┴────────────────────────────┘
```
