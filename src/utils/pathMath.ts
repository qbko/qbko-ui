//So we are exporting a function here

export const getButtonOffset = (
  lessonNumber: number,
  totalLesson: number,
  baseAmplitude: number = 100,
): number => {
  const IDEAL_SEGMENTS = 4;
  const currentSegment = lessonNumber - 1;
  const totalSegments = totalLesson - 1;

  if (totalSegments <= 0) return 0;

  // 1. Find which "hump" we are in
  const humpIndex = Math.floor(currentSegment / IDEAL_SEGMENTS);

  // 2. Determin the boundaries of this specific hump
  const humpStart = humpIndex * IDEAL_SEGMENTS;
  //Is this the very last hump in the unit?
  const isLastHump = humpIndex === Math.floor(totalSegments / IDEAL_SEGMENTS);
  const humpEnd = isLastHump ? totalSegments : humpStart + IDEAL_SEGMENTS;

  const humpLength = humpEnd - humpStart;
  if (humpLength <= 0) return 0;

  // 3. Local Progress within the hump
  const localProgress = (currentSegment - humpStart) / humpLength;

  // 4. Dynamic Amplitude Recalibration
  // This will achieve the smaller amplitude for shorter hump and large amplitude for bigger hump
  const dynamicAmplitude = baseAmplitude * (humpLength / IDEAL_SEGMENTS);

  // 5. Calculate Sine with alternating direction
  const direction = humpIndex % 2 === 0 ? 1 : -1;
  const offsetMultiplier = Math.sin(localProgress * Math.PI);

  return offsetMultiplier * dynamicAmplitude * direction;
};
