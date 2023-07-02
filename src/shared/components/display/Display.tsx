import { View, Text } from "react-native";
import { ReactNode } from "react";

interface DisplayProps {
  label: string;
  icon: ReactNode;
  value: string | number;
}

export default function Display({ icon, label, value }: DisplayProps) {
  return (
    <View className="w-full flex flex-row gap-4 items-center">
      <View className="flex flex-row gap-2">
        {icon}
        <Text
          className="
            text-purple-500
            text-[18px]
            font-bold
            text-ellipsis
          "
        >
          {label}
        </Text>
      </View>
      <View className="flex flex-1">
        <Text className="text-[18px] text-purple-700">
          {value}
        </Text>
      </View>
    </View>
  );
}
