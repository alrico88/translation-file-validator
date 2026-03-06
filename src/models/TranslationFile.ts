export type TranslationPrimitive = string | number | boolean | null;
export type TranslationValue =
  | TranslationPrimitive
  | TranslationContent
  | TranslationValue[];

export interface TranslationContent {
  [key: string]: TranslationValue;
}

export class TranslationFile {
  language: string;
  content: TranslationContent;

  constructor(language: string, content: TranslationContent) {
    this.language = language;
    this.content = content;
  }
}
