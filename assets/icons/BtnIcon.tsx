import { useMemo } from "react";
import { Path, Skia, Oval, Canvas, Group } from "@shopify/react-native-skia";

export const BtnIcon = ({ isFocused }: { isFocused: boolean }) => {
  //defining the base shape one time
  const bottomShape = useMemo(() => {
    return Skia.Path.MakeFromSVGString(
      "M0 0 L0 1.87769 C0 4.5 3.02202 6.99959 6.49952 6.99976 C9.9772 6.99976 13 4.5 13 1.87769 L13 0 Z",
    );
  }, []);

  // defining the coordinates for each tiny icons
  const layers = [
    { x: 0, y: 0 },
    { x: 17, y: 9 },
    { x: 0, y: 18 },
  ];

  return (
    <Canvas style={{ width: 30, height: 30 }} pointerEvents="none">
      {layers.map((offset, index) => (
        <Group
          key={index}
          transform={[{ translateX: offset.x }, { translateY: offset.y }]}
        >
          {bottomShape && (
            <Path
              path={bottomShape}
              color={isFocused ? "#0064C7" : "#8D8F91"}
              transform={[{ translateY: 5 }]}
            />
          )}
          <Oval
            x={0}
            y={0}
            width={13}
            height={10.8}
            color={isFocused ? "#0080FF" : "#8D8F91"}
          />
        </Group>
      ))}
    </Canvas>
  );
};
