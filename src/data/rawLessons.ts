import { RawUnit } from "../types/home";

// in the future, we will fetch the lesson data from Database or API

export const RAW_UNITS: RawUnit[] = [
  {
    id: "unit-1",
    title: "Unit 1: The Basics",
    lessons: Array.from({ length: 8 }, (_, i) => ({
      id: `u1-l${i + 1}`,
      unitId: "unit-1",
      lessonNumber: i + 1,
    })),
  },
  {
    id: "unit-2",
    title: "Unit 2: Daily Life",
    lessons: Array.from({ length: 12 }, (_, i) => ({
      id: `u2-l${i + 1}`,
      unitId: "unit-2",
      lessonNumber: i + 1,
    })),
  },
  {
    id: "unit-3",
    title: "Unit 3: Go Shopping",
    lessons: Array.from({ length: 11 }, (_, i) => ({
      id: `u3-l${i + 1}`,
      unitId: "unit-3",
      lessonNumber: i + 1,
    })),
  },
];
