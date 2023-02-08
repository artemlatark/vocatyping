export enum KeyboardLayoutKey {
  WORD = 'word',
  SENTENCE = 'sentence',
}

export enum keyboardLayout {
  MAC = 'mac',
  QWERTY = 'qwerty',
}

export type IKey = {
  key?: string;
  supKey?: string;
  finger?: number;
  code?: string;
  isSystemKey?: boolean;
  isSpace?: boolean;
};

interface NextTypeKeyCoords {
  left: number;
  top: number;
  width: number;
}

export interface NextTypeKey {
  finger?: number;
  coords: NextTypeKeyCoords;
}
