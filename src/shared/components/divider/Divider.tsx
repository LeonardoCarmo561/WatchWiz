import { View } from "react-native";

interface DividerProps {
  vertical?: boolean;
  thickness?: number | string;
  color?: string;
}

export default function Divider({ vertical = false, thickness = "[.4px]", color = "purple-400"}: DividerProps) {
  return (
    <View
      className={`
        ${vertical ? `h-full w-${thickness}` : `h-${thickness} w-full`}
        bg-${color}
      `}
    />
  )
}
