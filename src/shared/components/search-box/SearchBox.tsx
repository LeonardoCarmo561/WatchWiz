import { View, TextInput } from "react-native";

interface SearchBoxProps {
  value: string;
  placeHolder: string;
  setValue(e: string): void;
}

export default function SearchBox({ setValue, value, placeHolder }: SearchBoxProps) {
  return (
    <View
      className="
          flex
          w-full
          h-[50px]
          mb-2
        "
    >
      <TextInput
        value={value}
        onChangeText={(value) => setValue(value)}
        placeholder={placeHolder}
        placeholderTextColor="rgb(147, 51, 234)"
        className="
            border-purple-600
            rounded-[20px]
            border-[1px]
            text-purple-500
            h-[50px]
            flex-1
            p-2
          "
      />
    </View>
  );
}
