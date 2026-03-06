import Table from "cli-table3";
import { styleText } from "node:util";
import { ComparatorArray } from "./models/ComparatorArray";
import { ComparatorResult } from "./models/ComparatorResult";
import type {
  TranslationFile,
  TranslationContent,
} from "./models/TranslationFile";

export interface CheckOptions {
  log?: boolean;
}

export class TranslationChecker {
  files: TranslationFile[];

  constructor(files: TranslationFile[]) {
    this.files = files;
  }

  private static arrayComparator(
    arrays: ComparatorArray[],
  ): ComparatorResult[] {
    const { keyedArrays, allKeys } = arrays.reduce<{
      keyedArrays: { locale: string; contentSet: Set<string> }[];
      allKeys: Set<string>;
    }>(
      (acc, { locale, content }) => {
        const contentSet = new Set(content);
        contentSet.forEach((key) => {
          acc.allKeys.add(key);
        });
        acc.keyedArrays.push({ locale, contentSet });
        return acc;
      },
      { keyedArrays: [], allKeys: new Set<string>() },
    );

    return keyedArrays.map(({ locale, contentSet }) => {
      const missingKeys: string[] = [];

      allKeys.forEach((key) => {
        if (!contentSet.has(key)) {
          missingKeys.push(key);
        }
      });

      missingKeys.sort();
      return new ComparatorResult(locale, missingKeys);
    });
  }

  private static getAllKeysRecursive(
    obj: TranslationContent,
    prefix = "",
  ): string[] {
    return Object.keys(obj).reduce<string[]>((res, key) => {
      const value = Reflect.get(obj, key);

      if (Array.isArray(value) || value === null || typeof value !== "object") {
        return [...res, `${prefix}${key}`];
      }

      return [
        ...res,
        ...TranslationChecker.getAllKeysRecursive(value, `${prefix}${key}.`),
      ];
    }, []);
  }

  public check(options: CheckOptions = {}): ComparatorResult[] {
    const { log = true } = options;

    const asComparatorArray = this.files.map(
      ({ language, content }) =>
        new ComparatorArray(
          language,
          TranslationChecker.getAllKeysRecursive(content),
        ),
    );

    const unmatchedKeys = TranslationChecker.arrayComparator(asComparatorArray);

    const summaryTable = new Table({
      head: ["Language", "Missing translation keys"],
    });

    function getMissingContentText(missingContent: string[]) {
      const sortedMissing = [...new Set(missingContent)].sort();

      return sortedMissing.length > 0
        ? styleText("yellow", sortedMissing.join("\n"))
        : styleText("green", "All strings are OK");
    }

    unmatchedKeys.forEach(({ locale, missingKeys }) => {
      summaryTable.push([locale, getMissingContentText(missingKeys)]);
    });

    if (log) {
      console.log(summaryTable.toString());
    }

    return unmatchedKeys;
  }
}

export { TranslationFile } from "./models/TranslationFile";
export { ComparatorArray } from "./models/ComparatorArray";
export { ComparatorResult } from "./models/ComparatorResult";
export default TranslationChecker;
