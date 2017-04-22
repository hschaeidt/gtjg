import {PartOfSpeech} from "./PartOfSpeech";

export interface IVocabulary {
  character: string;
  kana: string[];
  meaning: string[];
  partOfSpeech: PartOfSpeech[];
  exception?: boolean;
}
