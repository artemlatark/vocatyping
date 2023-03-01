export enum keyboardLayout {
  MAC = 'mac',
  QWERTY = 'qwerty',
}

export type Key = {
  key?: string;
  supKey?: string;
  finger?: number;
  code?: string;
  isSystemKey?: boolean;
  isSpace?: boolean;
};

export interface NextTypeKey {
  finger?: number;
  coords: NextTypeKeyCoords;
}

interface NextTypeKeyCoords {
  left: number;
  top: number;
  width: number;
}
