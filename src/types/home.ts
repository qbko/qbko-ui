import { NodeLayout } from "../utils/pathMath";

// RAW DATA LAYER, this is what we are getting from the Database

export interface RawLesson {
  id: string;
  unitId: string;
  lessonNumber: number;
}

export interface RawUnit {
  id: string;
  title: string;
  lessons: RawLesson[];
}

// VIEW LAYER
// What the flashlist actually renders

export interface ButtonNode extends NodeLayout {
  type: "button";
  id: string;
  lessonNumber: number;
}

export interface DividerNode {
  type: "divider";
  id: string;
  title: string;
}

export interface CharacterNode {
  type: "character";
  id: string;
  offsetX: number;
  anchorButtonId: string;
}

// The Union Type for the Flashlist
export type HomeListItem = ButtonNode | DividerNode | CharacterNode;
