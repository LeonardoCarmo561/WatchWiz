import { ReactNode } from "react";
import { View } from "react-native";

interface BasePageProps {
  children: ReactNode;
  className?: string
}

export default function BasePage({ children, className }: BasePageProps) {
  return (
    <View
      className={`flex w-full h-full bg-gray-900 ${className}`}
    >
      {children}
    </View>
  )
}
