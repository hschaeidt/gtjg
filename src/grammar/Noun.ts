import {PartOfSpeech} from "../words/PartOfSpeech";

export default class Noun {
  constructor(word: Vocabulary) {
    if (!word.partOfSpeech.includes(PartOfSpeech.Noun)) {
      throw new TypeError("The word must be a noun");
    }

    this.word = word;
  }

  public declarative(): string {
   return `${this.word.character}だ`;
  }

  public negative(): string {
    return `${this.word.character}じゃない`;
  }

  public past(): string {
    return `${this.word.character}だった`;
  }

  public negativePast(): string {
    return `${this.word.character}じゃなかった`;
  }
}
