import { useMemo } from "react";
import { Path, Skia, Oval, Canvas, Group } from "@shopify/react-native-skia";

export const BtnIcon = ({ isFocused }: { isFocused: boolean }) => {
  const myPath = useMemo(() => {
    return Skia.Path.MakeFromSVGString(
      "M22 11C22 15.9706 17.0751 20 11 20C4.92487 20 0 15.9706 0 11V9H22V11Z",
    );
  }, []);

  return (
    <Canvas style={{ width: 24, height: 24 }} pointerEvents="none">
      <Group transform={[{ translateX: 1 }, { translateY: 2 }]}>
        {myPath && (
          <Path path={myPath} color={isFocused ? "#0064C7" : "#8D8F91"} />
        )}
        <Oval
          x={0}
          y={0}
          width={22}
          height={18}
          color={isFocused ? "#0080FF" : "#A1A3A5"}
        />
      </Group>
    </Canvas>
  );
};
