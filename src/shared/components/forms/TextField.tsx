import { useState, useEffect } from "react";
import { TextInput, Text, TextInputProps } from "react-native"
import { useField } from "@unform/core"

type TextFieldProps = TextInputProps & {
  name: string;
  format?(e: string): string;
}

export function TextField({
  name,
  format = (e) => e,
  ...rest
}: TextFieldProps) {
  const { fieldName, registerField, error, clearError, defaultValue } = useField(name);

  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    })
  }, [fieldName, registerField, value])

  return (
    <>
      <TextInput
        {...rest}
        value={format(value)}
        onChangeText={(value) => {
          setValue(value);
          clearError();
        }}
        className={
          rest.className
          ? rest.className
          : `border-purple-600
            border-[1px]
            rounded-[20px]
            h-[50px]
            w-full
            bg-purple-500
            p-2`
        }
      />
      {!!error && (
        <Text className="text-red-600">{error}</Text>
      )}
    </>
  )
}
