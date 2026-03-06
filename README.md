# translation-checker

Check missing keys across translation objects.

## Installation

`pnpm add -D translation-file-validator`

or `npm i --save-dev translation-file-validator`

## Usage

```js
const es = {
  hola: "mundo",
  nested: {
    existing: "both",
    missing: "falta",
  },
};

const en = {
  goodbye: "world",
  nested: {
    existing: "both",
    deepNest: {
      missingToo: "missing",
    },
  },
};
```

```js
const {
  TranslationChecker,
  TranslationFile,
} = require("translation-file-validator");

const languages = [
  new TranslationFile("Spanish", es),
  new TranslationFile("English", en),
];

const checker = new TranslationChecker(languages);
checker.check();
```

## API

```ts
type ComparatorResult = {
  locale: string;
  missingKeys: string[];
};

checker.check(options?: { log?: boolean }): ComparatorResult[];
```

```ts
const result = checker.check({ log: false });
```

`log` defaults to `true`. Arrays are treated as leaf keys.

### ESM

```js
import {
  TranslationChecker,
  TranslationFile,
} from "translation-file-validator";

const languages = [
  new TranslationFile("Spanish", es),
  new TranslationFile("English", en),
];

const checker = new TranslationChecker(languages);
checker.check();
```

## Console output

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

## Development

- `pnpm test`
- `pnpm typecheck`
- `pnpm build`
