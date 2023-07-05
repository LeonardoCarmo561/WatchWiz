import { View, TextInput } from "react-native";

interface SearchBoxProps {
  value: string;
  placeHolder: string;
  setValue(e: string): void;
  useEndIcon?: boolean;
  disabled?: boolean;
}

export default function SearchBox({ setValue, value, placeHolder, useEndIcon = false, disabled = false }: SearchBoxProps) {
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
        onChangeText={(newValue) => {
          if (disabled) {
            setValue(value)
          } else {
            setValue(newValue)
          }
        }}
        placeholder={placeHolder}
        placeholderTextColor={disabled ? "rgb(106, 106, 106)" : "rgb(147, 51, 234)"}
        className={`
            ${disabled ? "border-gray-600" : "border-purple-600"}
            rounded-[20px]
            border-[1px]
            ${disabled ? "text-gray-500" : "text-purple-500"}
            h-[50px]
            flex-1
            ${useEndIcon ? "pr-[55px] pl-2" : "p-2"}
          `}
      />
    </View>
  );
}
