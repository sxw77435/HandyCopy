
export enum Category {
  EMOJI = 'EMOJI',
  FONTS = 'FONTS',
  SYMBOLS = 'SYMBOLS',
  //AI_SEARCH = 'AI_SEARCH'
}

export interface EmojiItem {
  char: string;
  name: string;
  category: string;
}

export interface FontStyle {
  name: string;
  transform: (text: string) => string;
}

export interface Toast {
  id: number;
  message: string;
}
