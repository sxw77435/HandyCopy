export type KaomojiItem = {
  text: string;
  tags: string[]; // 用于搜索：cute/love/sad/angry等
  group: string;  // 用于分组展示
};

export const KAOMOJI_DATA: KaomojiItem[] = [
  // Cute
  { text: "(｡♥‿♥｡)", tags: ["cute", "love", "happy"], group: "Cute" },
  { text: "(´• ω •`)", tags: ["cute", "shy"], group: "Cute" },
  { text: "(≧◡≦)", tags: ["cute", "happy", "smile"], group: "Cute" },
  { text: "(๑˃̵ᴗ˂̵)و", tags: ["cute", "happy", "cheer"], group: "Cute" },
  { text: "(｡•̀ᴗ-)✧", tags: ["cute", "wink"], group: "Cute" },
  { text: "(>ᴗ<)", tags: ["cute", "happy"], group: "Cute" },
  { text: "(づ｡◕‿‿◕｡)づ", tags: ["cute", "hug"], group: "Cute" },
  { text: "૮₍ ˶ᵔ ᵕ ᵔ˶ ₎ა", tags: ["cute"], group: "Cute" },
  { text: "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", tags: ["cute", "party", "excited"], group: "Cute" },

  // Love
  { text: "(づ￣ ³￣)づ", tags: ["love", "kiss"], group: "Love" },
  { text: "(っ˘з(˘⌣˘ )", tags: ["love", "kiss"], group: "Love" },
  { text: "(๑♡⌓♡๑)", tags: ["love", "cute"], group: "Love" },
  { text: "(♡˙︶˙♡)", tags: ["love", "happy"], group: "Love" },
  { text: "(*˘︶˘*).｡.:*♡", tags: ["love"], group: "Love" },
  { text: "(ღ˘⌣˘ღ)", tags: ["love", "cute"], group: "Love" },

  // Happy
  { text: "(￣▽￣)", tags: ["happy", "smile"], group: "Happy" },
  { text: "(＾▽＾)", tags: ["happy", "smile"], group: "Happy" },
  { text: "(^_^)", tags: ["happy"], group: "Happy" },
  { text: "(^‿^)", tags: ["happy"], group: "Happy" },
  { text: "ヽ(•‿•)ノ", tags: ["happy"], group: "Happy" },

  // Sad / Cry
  { text: "(╥﹏╥)", tags: ["sad", "cry"], group: "Sad" },
  { text: "(ಥ﹏ಥ)", tags: ["sad", "cry"], group: "Sad" },
  { text: "(；＿；)", tags: ["sad", "cry"], group: "Sad" },
  { text: "(T_T)", tags: ["sad", "cry"], group: "Sad" },
  { text: "(；へ；)", tags: ["sad"], group: "Sad" },

  // Angry / Annoyed
  { text: "(ಠ_ಠ)", tags: ["angry", "annoyed"], group: "Angry" },
  { text: "(￣へ￣)", tags: ["angry", "annoyed"], group: "Angry" },
  { text: "(╬ಠ益ಠ)", tags: ["angry", "rage"], group: "Angry" },
  { text: "(¬_¬ )", tags: ["annoyed"], group: "Angry" },

  // Surprise / Shock
  { text: "(⊙_⊙)", tags: ["surprise", "shock"], group: "Surprise" },
  { text: "(O_O)", tags: ["surprise"], group: "Surprise" },
  { text: "Σ(ﾟДﾟ)", tags: ["surprise", "shock"], group: "Surprise" },

  // Sleep / Tired
  { text: "(－_－) zzZ", tags: ["sleep", "tired"], group: "Sleep" },
  { text: "(￣o￣) . z Z", tags: ["sleep", "tired"], group: "Sleep" },
  { text: "(_ _).｡o○", tags: ["sleep"], group: "Sleep" },

  // Cool / Smirk
  { text: "(⌐■_■)", tags: ["cool"], group: "Cool" },
  { text: "(¬‿¬)", tags: ["smirk", "cool"], group: "Cool" },
  { text: "(￣︶￣)", tags: ["cool"], group: "Cool" },

  // Fight / Energy
  { text: "(ง'̀-'́)ง", tags: ["fight", "angry"], group: "Fight" },
  { text: "٩(ˊᗜˋ*)و", tags: ["fight", "happy"], group: "Fight" },
  { text: "(•̀ᴗ•́)و ̑̑", tags: ["fight"], group: "Fight" },
];
