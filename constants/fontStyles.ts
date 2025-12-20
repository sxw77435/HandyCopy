import { FontStyle } from '../types';
import { transformByStyle } from '../utils/textTransform';

export const FONT_STYLES: FontStyle[] = [
  //font styles
  { name: 'Bold', transform: t => transformByStyle(t, 'bold') },
  { name: 'Italic', transform: t => transformByStyle(t, 'italic') },
  { name: 'Script', transform: t => transformByStyle(t, 'script') },
  { name: 'Monospace', transform: t => transformByStyle(t, 'mono') },
  { name: 'Bubbles', transform: t => transformByStyle(t, 'bubbles') },
  { name: 'Double Struck', transform: t => transformByStyle(t, 'double') },
  { name: 'Small Caps', transform: t => transformByStyle(t, 'smallcaps') },
  { name: 'Sans Bold', transform: t => transformByStyle(t, 'sansBold') },
  { name: 'Sans Italic', transform: t => transformByStyle(t, 'sansItalic') },
  { name: 'Sans Bold Italic', transform: t => transformByStyle(t, 'sansBoldItalic') },
  { name: 'Fraktur', transform: t => transformByStyle(t, 'fraktur') },
  { name: 'Outline', transform: t => transformByStyle(t, 'outline') },
  { name: 'Parenthesis', transform: t => transformByStyle(t, 'parenthesis') },
  { name: 'Square Letters', transform: t => transformByStyle(t, 'square') },

    // ✨ Simple Decor
  { name: 'Sparkle', transform: t => `✨ ${t} ✨` },
  { name: 'Star', transform: t => `★ ${t} ★` },
  { name: 'Fire', transform: t => `🔥 ${t} 🔥` },
  { name: 'Heart', transform: t => `♡ ${t} ♡` },

  // 🌸 Cute / CJK style
  { name: 'Cute Face', transform: t => `(｡◕‿◕｡) ${t} (｡◕‿◕｡)` },
  { name: 'Flower', transform: t => `✿ ${t} ✿` },
  { name: 'Kawaii', transform: t => `(≧◡≦) ♡ ${t} ♡` },

  // ⚡ Emphasis
  { name: 'Lightning', transform: t => `⚡ ${t} ⚡` },
  { name: 'Warning', transform: t => `⚠️ ${t} ⚠️` },
  { name: 'Arrow', transform: t => `➤ ${t} ◀` },

  // 🧱 Frame / Bracket
  { name: 'Square Bracket', transform: t => `[ ${t} ]` },
  { name: 'Curly Bracket', transform: t => `{ ${t} }` },
  { name: 'Angle Bracket', transform: t => `⟨ ${t} ⟩` },

  // 🌀 Fancy / Social
  { name: 'Double Line', transform: t => `〓 ${t} 〓` },
  { name: 'Wave', transform: t => `~* ${t} *~` },
  { name: 'Dot', transform: t => `• ${t} •` },

];
