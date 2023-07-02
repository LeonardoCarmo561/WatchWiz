import { useState } from "react";
import { View, Image, Text, Pressable, TextInput } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useAuthContext } from "../../shared/contexts/AuthContext";
import { login } from "../../shared/services/api/login";
import { useStorageContext } from "../../shared/contexts/StorageContext";

export default function Login({ navigation }: any) {
  const Hat = require("../../images/hat.png");

  const { storage } = useStorageContext();
  const { setUser } = useAuthContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    login({
      username: username,
      password: password,
      grant_type: "password",
    }).then((result) => {
      if (result instanceof Error) {
        alert("Usuário e/ou senha incorretos");
      } else {
        storage.set("access_token", result.access_token);
        storage.set("refresh_token", result.refresh_token);
        setUser({
          access_token: result.access_token,
          refresh_token: result.refresh_token,
        });
      }
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
            placeholder="usuário"
            value={username}
            onChangeText={(value) => setUsername(value)}
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
            onPress={handleSubmit}
            className="
            w-[100px]
            h-[35px]
            bg-purple-600
            rounded-[20px]
            items-center
            justify-center
            border-purple-900
            border-[1px]
          "
          >
            <Text>ENTRAR</Text>
          </Pressable>
          <Pressable
            className="
            w-[150px]
            h-[35px]
            rounded-[20px]
            items-center
            justify-center
            border-purple-900
            border-[1px]
          "
          >
            <Text>ESQUECI A SENHA</Text>
          </Pressable>
        </View>
      </View>
      <Pressable
        className="pt-2 w-full items-center rounded-[20px] h-[35px]"
        onPress={() => navigation.navigate("sign-up")}
      >
        <Text className="text-purple-600 font-bold text-[20px] shadow-lg">
          Não possui conta? Cadastre-se
        </Text>
      </Pressable>
    </View>
  );
}
