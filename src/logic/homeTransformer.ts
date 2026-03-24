import { RawUnit, HomeListItem } from "../types/home";
import { computeUnitLayout } from "../utils/pathMath";

//This is where we transform data to usable layout
export function transformUnitsToLayout(units: RawUnit[]): HomeListItem[] {
  const flattenedList: HomeListItem[] = [];

  // Add the Divider for the Unit
  units.forEach((unit) => {
    flattenedList.push({
      type: "divider",
      id: `divider-${unit.id}`,
      title: unit.title,
    });

    // Calculate the math for all lessons in this unit
    const layouts = computeUnitLayout(unit.lessons.length);

    unit.lessons.forEach((lesson, index) => {
      const layout = layouts[index];

      flattenedList.push({
        type: "button",
        id: lesson.id,
        state: "current",
        unitIndex: 0,
        lessonNumber: lesson.lessonNumber,
        offsetX: layout.offsetX,
        rowHeight: layout.rowHeight,
        peakDirection: layout.peakDirection,
      });
      // Inject a character
      if (layout.peakDirection !== null) {
        // move the character based on the peak direction
        const placementDirection = layout.peakDirection === "right" ? -1 : 1;
        // Becasue, if the peak is facing right, we are placing the character on the left,
        // hence -1 and vice versa
        const distanceFromButton = 180;

        flattenedList.push({
          type: "character",
          id: `char-${lesson.id}`,
          offsetX: layout.offsetX + distanceFromButton * placementDirection,
          anchorButtonId: lesson.id,
        });
      }
    });
  });

  return flattenedList;
}
