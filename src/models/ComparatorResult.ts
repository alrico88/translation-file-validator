export class ComparatorResult {
  locale: string;
  missingKeys: string[];

  constructor(locale: string, missingKeys: string[]) {
    this.locale = locale;
    this.missingKeys = missingKeys;
  }
}
