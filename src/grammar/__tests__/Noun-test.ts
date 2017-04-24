import Noun from "../Noun";
import Vocabulary from "../Vocabulary";
import * as availableWords from "../../fixtures/vocabulary.json";

const getValidNoun = (): Noun => {
  return new Noun(availableWords[0]);
}

const getInvalidNoun = (): Noun => {
  return new Noun(availableWords[3]);
}

describe("Noun Conjugations", () => {
  test("initialize a new noun", () => {
    expect(getValidNoun).not.toThrow();
  });

  test("fail to initialize a noun", () => {
    expect(getInvalidNoun).toThrow(TypeError);
  });

  test("conjugate to the declarative state of being", () => {
    const noun = getValidNoun();
    expect(noun.declarative()).toBe("元気だ");
  });

  test("conjugate to the negative state of being", () => {
    const noun = getValidNoun();
    expect(noun.negative()).toBe("元気じゃない");
  });

  test("conjugate to the past state of being", () => {
    const noun = getValidNoun();
    expect(noun.past()).toBe("元気だった");
  });

  test("conjugate to the negative-past state of being", () => {
    const noun = getValidNoun();
    expect(noun.negativePast()).toBe("元気じゃなかった");
  });
});
