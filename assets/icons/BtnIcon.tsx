import { useMemo } from "react";
import {Path, Skia, Oval, Canvas} from "@shopify/react-native-skia";

export const BtnIcon = ({isFocused}: {isFocused: boolean}) => {
    const topBase = useMemo(() =>{
        return Skia.Path.MakeFromSVGString()
    },[])

    const middleBase = useMemo(() => {
        return Skia.Path.MakeFromSVGString()
    },[])

    const bottomBase = useMemo(() => {
        return Skia.Path.MakeFromSVGString()
    },[])
    return ()
}