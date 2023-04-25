export enum keyboardLayout {
  MAC = 'mac',
  QWERTY = 'qwerty',
}

export interface Key {
  key?: string;
  supKey?: string;
  finger?: number;
  code?: string;
  isSystemKey?: boolean;
  isSpace?: boolean;
}

export interface NextTypeKey {
  finger?: number;
  coords: NextTypeKeyCoords;
  qwerty: any;
}

interface NextTypeKeyCoords {
  left: number;
  top: number;
  width: number;
}
