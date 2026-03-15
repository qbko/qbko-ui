import { computeUnitLayout } from "../utils/pathMath";

export interface ButtonNode {
  type: "button";
  id: string;
  unit: string;
  totalLesson: number;
  lessonNumber: number;
  offsetX: number;
  rowHeight: number;
}

function buildUnit(unitName: string, lessonCount: number): ButtonNode[] {
  const layout = computeUnitLayout(lessonCount);

  return Array.from({ length: lessonCount }, (_, i) => ({
    type: "button" as const,
    id: `${unitName}-lesson-${i + 1}`,
    unit: unitName,
    totalLesson: lessonCount,
    lessonNumber: i + 1,
    offsetX: layout[i].offsetX,
    rowHeight: layout[i].rowHeight,
  }));
}

export const lessonData: ButtonNode[] = [
  ...buildUnit("unit-1", 8),
  ...buildUnit("unit-2", 9),
];
