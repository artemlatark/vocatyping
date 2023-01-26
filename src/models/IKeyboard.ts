export enum KeyboardLayoutKey {
  WORD = 'word',
  SENTENCE = 'sentence',
}

export enum keyboardLayout {
  MAC = 'mac',
  QWERTY = 'qwerty',
}

interface NextTypeKeyCoords {
  left: number;
  top: number;
  width: number;
}

export interface NextTypeKey {
  finger: number;
  coords: NextTypeKeyCoords;
}
