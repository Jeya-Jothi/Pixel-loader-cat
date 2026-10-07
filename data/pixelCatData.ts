// Pixel cat sprite data. Each character maps to a color in CAT_PALETTE.
// "." = transparent. Edit the strings to redraw the cat.
export const CAT_WIDTH = 32;
export const CAT_HEIGHT = 25;

export const CAT_PALETTE: Record<string, string> = {
  K: "#1b1b21", // fur
  D: "#2c2c35", // fur shade
  G: "#3f3f4a", // fur highlight
  I: "#6b4a55", // inner ear
  E: "#f0a31a", // eye
  X: "#0b0b0e", // pupil
  H: "#fff2c6", // eye shine
  N: "#e59aa6", // nose
  W: "#8c8c96", // whiskers
};

// Static body (no tail)
export const CAT_BODY: readonly string[] = [
  ".......K............K...........",
  "......KKK..........KKK..........",
  "......KIIK........KIIK..........",
  "......KIIKKKKKKKKKKIIK..........",
  "......KKIKKKDKKDKKKIKK..........",
  ".....KKKKKKKKDKKDKKKKKK.........",
  ".....KKKKKKKKKKKKKKKKKK.........",
  ".....KKKEEKKKKKKKKEEKKK.........",
  ".....KKEHXEKKKKKKEXHEKK.........",
  ".....KKEXXEKKKKKKEXXEKK.........",
  ".....KKKEEKKKKKKKKEEKKK.........",
  "..WWWKKKKKKKKNNKKKKKKKKWWW......",
  "....WWKKKKKKKDDKKKKKKKWW........",
  ".......KKKKKKKKKKKKKK...........",
  "........KKKKDDDDKKKK............",
  ".......KKKKDDDDDDKKKK...........",
  ".......KKKKDGGGGDKKKK...........",
  ".......KKKDDGGGGDDKKK...........",
  ".......KDKDGDKKDGDKDK...........",
  ".......KDKDGDKKDGDKDK...........",
  ".......KDKDGDKKDGDKDK...........",
  ".......KDKDGDKKDGDKDK...........",
  "......KKKKDDGKKGDDKKKK..........",
  "......KKKKKDGKKGDKKKKK..........",
  "......KKKGKGK..KGKGKKK..........",
];

// Tail is a separate sprite so it can move on its own.
// Drawn behind the body, starting at CAT_TAIL_ORIGIN.
export const CAT_TAIL_ORIGIN = { x: 21, y: 13 };

export const CAT_TAIL_FRAMES: readonly (readonly string[])[] = [
  // 0: leans left
  [
    ".....KK....",
    "....KK.....",
    "....KK.....",
    ".....KK....",
    ".....KK....",
    ".....KK....",
    "......KK...",
    "......KK...",
    ".....KKK...",
    "....KKK....",
    "KKKKKK.....",
    "KKKKK......",
  ],
  // 1: upright
  [
    ".......KK..",
    "......KK...",
    "......KK...",
    "......KK...",
    "......KK...",
    "......KK...",
    "......KK...",
    "......KK...",
    ".....KKK...",
    "....KKK....",
    "KKKKKK.....",
    "KKKKK......",
  ],
  // 2: leans right
  [
    ".........KK",
    "........KK.",
    ".......KK..",
    ".......KK..",
    ".......KK..",
    ".......KK..",
    "......KK...",
    "......KK...",
    ".....KKK...",
    "....KKK....",
    "KKKKKK.....",
    "KKKKK......",
  ],
];

// Order the frames play in (loops). Add or reorder to change the wag.
export const CAT_TAIL_SEQUENCE: readonly number[] = [1, 2, 1, 0];
