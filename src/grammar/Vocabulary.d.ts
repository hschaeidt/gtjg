declare type PartOfSpeech = "noun";

export interface Vocabulary {
  character: string;
  kana: string[];
  meaning: string[];
  partOfSpeech: PartOfSpeech[];
  exception?: boolean;
}

export default "";
