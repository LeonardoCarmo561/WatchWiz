import { View, Pressable, Text } from "react-native";
import { Form } from "@unform/mobile";

import { createUser } from "../../shared/services/api";
import { useForm } from "../../shared/components/forms/useForm";
import { TextField } from "../../shared/components/forms/TextField";

export default function SignUp({ navigation }: any) {
  const { formRef } = useForm()

  function handleSubmit(formData: {}) {
    createUser(formData)
    .then((result) => {
      if (result instanceof Error) {
        console.error(result.message)
      } else {
        alert('Usuário cadastrado com sucesso')
        formRef.current?.reset()
        navigation.navigate('login')
      }
    })
  }

  return (
    <View
      className="
      flex
      items-center justify-center
      w-full h-full
      bg-gray-900
    "
    >
      <View
        id="purple-box"
        className="
          p-10
          w-full
          h-auto
          bg-purple-400
          rounded-[20px]
          border-purple-600
          border-[2px]
          flex
        "
      >
        <Form
          onSubmit={handleSubmit}
          ref={formRef}
        >
          <View
            id="form-container"
            className="
              flex
              w-auto
              h-auto
              gap-2
            "
          >
            <TextField
              name="email"
              placeholder="e-mail"
            />
            <TextField
              placeholder="Nome de usuário"
              name="username"
            />
            <TextField
              secureTextEntry
              name="password"
              placeholder="Senha"
            />
            <TextField
              name="birthdate"
              placeholder="Data de nascimento"
            />
            <View
              id="buttons"
              className="
                flex
                flex-row
                gap-3
              "
            >
              <Pressable
                onPress={() => formRef.current?.submitForm()}
                className="
                  flex
                  flex-1
                  b-[2px]
                  rounded-[20px]
                  h-[45px]
                  items-center
                  justify-center
                  bg-purple-900
                "
              >
                <Text className="font-bold text-[20px] font-serif">cadastrar</Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  formRef.current?.reset()
                  navigation.navigate("login")
                }}
                className="
                  flex
                  flex-1
                  h-[45px]
                  border-[2px]
                  items-center
                  rounded-[20px]
                  justify-center
                  border-purple-900
                  bg-purple-500
                "
              >
                <Text className="font-bold">Voltar para login</Text>
              </Pressable>
            </View>
          </View>
        </Form>
      </View>
    </View>
  );
}
