<br><a name="TranslationChecker"></a>

## TranslationChecker

- [TranslationChecker](#TranslationChecker)
  - [new TranslationChecker()](#new_TranslationChecker_new)
  - _instance_
    - [.check()](#TranslationChecker+check) ⇒ <code>void</code>
  - _static_
    - [.TranslationChecker](#TranslationChecker.TranslationChecker)
      - [new TranslationChecker(files)](#new_TranslationChecker.TranslationChecker_new)

<br><a name="new_TranslationChecker_new"></a>

### new TranslationChecker()

> Helper to check multiple translation files for missing keys between them
> Logs output as a table in the console

<br><a name="TranslationChecker+check"></a>

### translationChecker.check() ⇒ <code>void</code>

> Compares translation files to see which keys are missing from each other

<br><a name="TranslationChecker.TranslationChecker"></a>

### TranslationChecker.TranslationChecker

<br><a name="new_TranslationChecker.TranslationChecker_new"></a>

#### new TranslationChecker(files)

> Creates an instance of TranslationChecker.

| Param | Type                                       |
| ----- | ------------------------------------------ |
| files | <code>Array.&lt;TranslationFile&gt;</code> |
