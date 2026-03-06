import { TranslationChecker, TranslationFile } from "../src/index";

const es = {
  hola: "mundo",
  nested: {
    existing: "both",
    missing: "falta",
    contentAsArray: ["hola"],
  },
};

const en = {
  goodbye: "world",
  nested: {
    existing: "both",
    contentAsArray: ["hello"],
    deepNest: {
      missingToo: "missing",
    },
  },
};

describe("Test main function", () => {
  test("It should report missing translations successfully", () => {
    const languages = [
      new TranslationFile("Spanish", es),
      new TranslationFile("English", en),
    ];
    const checker = new TranslationChecker(languages);
    const result = checker.check({ log: false });

    expect(result).toEqual([
      {
        locale: "Spanish",
        missingKeys: ["goodbye", "nested.deepNest.missingToo"],
      },
      {
        locale: "English",
        missingKeys: ["hola", "nested.missing"],
      },
    ]);
  });

  test("It should treat arrays as leaf keys", () => {
    const esWithArray = new TranslationFile("Spanish", {
      labels: ["uno", "dos"],
      shared: "ok",
    });
    const enWithoutArray = new TranslationFile("English", {
      shared: "ok",
    });

    const checker = new TranslationChecker([esWithArray, enWithoutArray]);
    const result = checker.check({ log: false });

    expect(result).toEqual([
      {
        locale: "Spanish",
        missingKeys: [],
      },
      {
        locale: "English",
        missingKeys: ["labels"],
      },
    ]);
  });
});
