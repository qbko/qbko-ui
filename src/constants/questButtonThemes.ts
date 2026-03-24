import { palette } from "./colors";
import { attachOpacity } from "../utils/colorUtils";
import { QuestButtonState } from "../types/questButton";

interface ButtonColorFamily {
  base: string;
  // Skia colors prop expects mutable arrays, so we are going to spread them by
  // using the '...'
  surfaceOne: readonly [string, string];
  surfaceTwo: readonly [string, string];
  dark: string;
  sideShadow: readonly [string, string, string];
  highlight: string;
}

const unitColorFamilies: ButtonColorFamily[] = [
  //blue
  {
    base: palette.blue400,
    surfaceOne: [palette.blue500, attachOpacity(palette.blue500, 0)],
    surfaceTwo: [
      attachOpacity(palette.blue100, 0.4),
      attachOpacity(palette.blue100, 0),
    ],
    dark: palette.blue500,
    sideShadow: [palette.blue500, palette.blue800, palette.blue500],
    highlight: palette.white,
  },
  //green
  {
    base: palette.green400,
    surfaceOne: [palette.green500, attachOpacity(palette.green500, 0)],
    surfaceTwo: [
      attachOpacity(palette.green100, 0.4),
      attachOpacity(palette.green100, 0),
    ],
    dark: palette.green500,
    sideShadow: [palette.green500, palette.green800, palette.green500],
    highlight: palette.white,
  },
  //orange
  {
    base: palette.orange400,
    surfaceOne: [palette.orange500, attachOpacity(palette.orange500, 0)],
    surfaceTwo: [
      attachOpacity(palette.orange100, 0.4),
      attachOpacity(palette.orange100, 0),
    ],
    dark: palette.orange500,
    sideShadow: [palette.orange500, palette.orange800, palette.orange500],
    highlight: palette.white,
  },
];

// get color theme based on unit index
function getUnitColors(unitIndex: number): ButtonColorFamily {
  return unitColorFamilies[unitIndex % unitColorFamilies.length];
}

// locked state theme
const LOCKED_THEME: ButtonColorFamily = {
  base: palette.gray400,
  surfaceOne: [palette.gray500, attachOpacity(palette.gray500, 0)],
  surfaceTwo: [
    attachOpacity(palette.gray100, 0.4),
    attachOpacity(palette.gray100, 0),
  ],
  dark: palette.gray500,
  sideShadow: [palette.gray500, palette.gray800, palette.gray500],
  highlight: palette.white,
};

const LOADING_THEME: ButtonColorFamily = LOCKED_THEME;

//legendary state
const LEGENDARY_THEME: ButtonColorFamily = {
  base: palette.legend400,
  surfaceOne: [palette.legend600, attachOpacity(palette.gray600, 0)],
  surfaceTwo: [
    attachOpacity(palette.legend50, 0.4),
    attachOpacity(palette.legend50, 0),
  ],
  dark: palette.legend900,
  sideShadow: [palette.legend400, palette.legend900, palette.legend400],
  highlight: palette.white,
};

export function getQuestButtonTheme(
  state: QuestButtonState,
  unitIndex: number,
): ButtonColorFamily {
  switch (state) {
    case "current":
    case "completed":
      return getUnitColors(unitIndex);
    case "locked":
      return LOCKED_THEME;
    case "legendary":
      return LEGENDARY_THEME;
    case "loading":
      return LOADING_THEME;
  }
}
