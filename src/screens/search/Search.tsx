import { View, TextInput, ScrollView } from "react-native";
import BasePage from "../../shared/components/page/Page";
import { useEffect, useState } from "react";

export default function Search() {
  const [search, setSearch] = useState("");

  useEffect(() => {}, []);

  return (
    <BasePage>
      <View
        className="
          flex
          w-full
          h-[50px]
        "
      >
        <TextInput
          value={search}
          onChangeText={(value) => setSearch(value)}
          placeholder="Pesquisar..."
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
      <ScrollView></ScrollView>
    </BasePage>
  );
}
