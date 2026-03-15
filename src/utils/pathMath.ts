export interface NodeLayout {
  offsetX: number;
  rowHeight: number;
}

const SEGMENTS_PER_HUMP = 4;
const MIN_ROW_HEIGHT = 90;

export function computeUnitLayout(
  totalLessons: number,
  amplitude: number = 100,
): NodeLayout[] {
  if (totalLessons <= 1) {
    return [{ offsetX: 0, rowHeight: MIN_ROW_HEIGHT }];
  }

  const totalSegments = totalLessons - 1;
  const numHumps = Math.max(1, Math.round(totalSegments / SEGMENTS_PER_HUMP));

  const xOffsets: number[] = [];
  for (let i = 0; i < totalLessons; i++) {
    //This outcome is radian, basically measure the angular progression on a sine curve.
    const theta = (i / totalSegments) * numHumps * Math.PI;
    xOffsets.push(amplitude * Math.sin(theta));
  }

  //This is here to find out the largest gap
  let maxDx = 0;
  for (let i = 0; i < totalSegments; i++) {
    maxDx = Math.max(maxDx, Math.abs(xOffsets[i + 1] - xOffsets[i]));
  }

  //Now we have the minimum row height, and the gap on the x-axis
  // with basic pythagorean theorem we can calculate the target distance between the nodes
  const targetDistance = Math.sqrt(
    MIN_ROW_HEIGHT * MIN_ROW_HEIGHT + maxDx * maxDx,
  );

  // Since now we have the target distance, and the xOffset already, again, using the same trigonometry formula
  // we can calculate the the final row height
  const layout: NodeLayout[] = [];
  for (let i = 0; i < totalLessons; i++) {
    let rowHeight: number;

    if (i < totalLessons - 1) {
      const dx = xOffsets[i + 1] - xOffsets[i];
      rowHeight = Math.sqrt(targetDistance * targetDistance - dx * dx);
    } else {
      rowHeight = targetDistance;
    }

    layout.push({ offsetX: xOffsets[i], rowHeight });
  }

  return layout;
}
