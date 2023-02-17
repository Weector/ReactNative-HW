import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export default function dimensionsWidth() {
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    const width = Dimensions.get("window").width - 16 * 2;
    setDimensions(width);
  }, []);

  return dimensions;
}
