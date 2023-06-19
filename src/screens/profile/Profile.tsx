import { View, Text, Image, TextInput } from "react-native";

export default function Profile() {
  return (
    <View
      className="
        flex
        w-full h-full
        bg-gray-900
        p-2
        pt-[40px]
      "
    >
      <View className="p-4 items-center flex">
        <Image
          className="w-[150px] h-[150px] rounded-full"
          source={{
            uri: "https://marketplace.canva.com/EAFEits4-uw/1/0/800w/canva-boy-cartoon-gamer-animated-twitch-profile-photo-r0bPCSjUqg0.jpg",
          }}
        />
        <Text className="font-bold text-[20px] text-purple-600">Olá, Leonardo!</Text>
        <Text className="text-purple-600">clique na foto para editar</Text>
      </View>
      <View className="flex flex-1 flex-col">
        <View className="flex p-2">
          <TextInput
            value="Leonardo Carmo"
            className="
              p-4
              text-[15px]
              text-purple-300
              h-[50px]
              w-full
              border-purple-600
              border-[2px]
              rounded-[20px]
            "
          />
        </View>
        <View className="flex p-2">
          <TextInput
            value="carmoleo@gmail.com"
            className="
              p-4
              text-[15px]
              text-purple-300
              h-[50px]
              w-full
              border-purple-600
              border-[2px]
              rounded-[20px]
            "
          />
        </View>
        <View className="flex p-2 justify-between flex-row">
          <Text className="text-purple-600 font-bold text-[25px]">Filmes assistidos:</Text>
          <Text className="text-purple-300 font-bold text-[25px]">57</Text>
        </View>
        <View className="flex p-2 justify-between flex-row">
          <Text className="text-purple-600 font-bold text-[25px]">Séries Assistidas:</Text>
          <Text className="text-purple-300 font-bold text-[25px]">109</Text>
        </View>
        <View className="flex p-2 justify-between flex-row">
          <Text className="text-purple-600 font-bold text-[25px]">Tempo de tela:</Text>
          <Text className="text-purple-300 font-bold text-[25px]">3M; 7D; 3h</Text>
        </View>
      </View>
    </View>
  );
}