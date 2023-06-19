import * as yup from "yup";
import { useState } from "react";
import { View, Image, Text, Pressable, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Form } from "@unform/mobile";

import formValidationSchema, { IFormData } from "./validation";
import TextField from "../../shared/components/forms/TextField";
import { useForm } from "../../shared/components/forms/useForm";
import { useAuthContext } from "../../shared/contexts/AuthContext";

export default function Login({ navigation }: any) {
  const Hat = require("../../images/hat.png");

  const { formRef } = useForm();
  const { signin } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (formData: IFormData) => {
    formValidationSchema
      .validate(formData, { abortEarly: false })
      .then((validatedData) => {
        signin(validatedData);
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: { [key: string]: string } = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });
        formRef.current?.setErrors(validationErrors);
      });
  };

  return (
    <View
      className="
      flex
      items-center justify-center
      w-full h-full
      bg-gray-900
      p-2
    "
    >
      <StatusBar style="light" translucent />
      <View
        className={`
        w-full
        h-[300px]
        bg-purple-400
        rounded-[20px]
        border-purple-600
        border-[2px]
        justify-center
        items-center
        flex
      `}
      >
        <Image
          style={{
            width: 300,
            height: 300,
            position: "absolute",
            top: -180,
            zIndex: 2,
          }}
          source={Hat}
        />
        <Text className="text-[30px]">Faça Login</Text>
        <View className="flex gap-2 w-screen px-[32px] pt-2">
          <TextInput
            placeholder="e-mail"
            value={email}
            onChangeText={(value) => setEmail(value)}
            className="
                border-purple-600
                border-[1px]
                rounded-[20px]
                h-[50px]
                w-full
                bg-purple-500
                p-2
              "
          />
          <TextInput
            placeholder="senha"
            value={password}
            onChangeText={(value) => setPassword(value)}
            secureTextEntry
            className="
                border-purple-600
                border-[1px]
                rounded-[20px]
                h-[50px]
                w-full
                bg-purple-500
                p-2
              "
          />
        </View>
        <View className="flex flex-row w-full space-x-2 justify-center items-center mt-4">
          <Pressable
          onPress={() => handleSubmit({email, password})}
          className="
            w-[100px]
            h-[35px]
            bg-purple-600
            rounded-[20px]
            items-center
            justify-center
            border-purple-900
            border-[1px]
          ">
            <Text >ENTRAR</Text>
          </Pressable>
          <Pressable className="
            w-[150px]
            h-[35px]
            rounded-[20px]
            items-center
            justify-center
            border-purple-900
            border-[1px]
          ">
            <Text>ESQUECI A SENHA</Text>
          </Pressable>
        </View>
      </View>
      <Pressable className="pt-2 w-full items-center rounded-[20px] h-[35px]">
        <Text className="text-purple-600 font-bold text-[20px] shadow-lg">Não possui conta? Cadastre-se</Text>
      </Pressable>
    </View>
  );
}
