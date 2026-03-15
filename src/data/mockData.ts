// defining the interfaces for the nodes
export interface ButtonNode {
  type: "button";
  id: string;
  unit: string;
  totalLesson: number;
  lessonNumber: number; // 1-based, resets per unit
}

export const lessonData = [
  // Unit-1: 15 nodes (lesson 1–15)
  ...Array.from({ length: 8 }, (_, i) => ({
    type: "button" as const,
    id: `unit-1-lesson-${i + 1}`,
    unit: "Unit-1",
    totalLesson: 8,
    lessonNumber: i + 1,
  })),
  // Unit-2: 12 nodes (lesson 1–12)
  ...Array.from({ length: 9 }, (_, i) => ({
    type: "button" as const,
    id: `unit-2-lesson-${i + 1}`,
    unit: "Unit-2",
    totalLesson: 9,
    lessonNumber: i + 1,
  })),
];
