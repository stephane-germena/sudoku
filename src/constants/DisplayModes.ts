import { EMOJI_MAP } from "./DisplayMode_EMOJI";
import { NUMBER_MAP } from "./DisplayMode_NUMBER";

export const NUMBER = "NUMBER";
export const EMOJI = "EMOJI";

export type DISPLAY_MODES = typeof NUMBER | typeof EMOJI;

export const DISPLAY_MAPS = {
  NUMBER : NUMBER_MAP,
  EMOJI : EMOJI_MAP, 
};