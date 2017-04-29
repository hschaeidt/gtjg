import test from "ava";
import * as availableWords from "../../fixtures/vocabulary.json";
import Noun from "../Noun";

const getValidNoun = (): Noun => {
  return new Noun(availableWords[0]);
};

const getInvalidNoun = (): Noun => {
  return new Noun(availableWords[3]);
};

// Noun conjugations
test("initialize a new noun", (t) => {
  t.notThrows(() => {
    getValidNoun();
  });
});

test("fail to initialize a noun", (t) => {
  t.throws(() => {
    getInvalidNoun();
  }, TypeError);
});

test("conjugate to the declarative state of being", (t) => {
  const noun = getValidNoun();
  t.is(noun.declarative(), "元気だ");
});

test("conjugate to the negative state of being", (t) => {
  const noun = getValidNoun();
  t.is(noun.negative(), "元気じゃない");
});

test("conjugate to the past state of being", (t) => {
  const noun = getValidNoun();
  t.is(noun.past(), "元気だった");
});

test("conjugate to the negative-past state of being", (t) => {
  const noun = getValidNoun();
  t.is(noun.negativePast(), "元気じゃなかった");
});
