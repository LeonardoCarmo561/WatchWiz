import { useEffect, useState } from 'react';
import { Text, TextInput, TextInputProps } from 'react-native';
import { useField } from '@unform/core'

export type TextFieldProps = TextInputProps & {
  name: string;
  errorClassName?: string;
}

export default function TextField({
  name,
  errorClassName,
  ...rest
}: TextFieldProps) {
  const { clearError, defaultValue, error, fieldName, registerField } = useField(name);
  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    })
  }, [value])

  return (
    <>
      <TextInput
        value={value}
        onChangeText={(text) => {setValue(text); clearError()}}
        {...rest}
      />
      {error && <Text className='text-center text-red-600'>{error}</Text>}
    </>
  )
}