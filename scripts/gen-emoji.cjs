const fs = require('fs');
const emojiData = require('emoji.json');

const result = emojiData.map(item => ({
  char: item.char,
  name: item.name.toLowerCase(),
  category: item.category || 'Other',
}));

const output = `import { EmojiItem } from '../../types';

export const EMOJI_DATA = ${JSON.stringify(result, null, 2)};
`;

fs.writeFileSync('./data/emoji/emoji.full.ts', output, 'utf8');

console.log('✅ emoji.full.ts generated:', result.length);
