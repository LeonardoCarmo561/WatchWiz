import { View, TextInput, ScrollView } from "react-native";
import { useEffect, useState } from "react";

import BasePage from "../../shared/components/page/Page";
import { useDebounce } from "../../shared/hooks";
import { Movie, searchByTitle } from "../../shared/services/api";
import { useAuthContext } from "../../shared/contexts/AuthContext";
import { MovieContainer } from "../../shared/components";

export default function Search() {
  const { debounce } = useDebounce(1500);
  const { user } = useAuthContext();

  const [search, setSearch] = useState("");

  const [data, setData] = useState<Movie[]>([]);

  useEffect(() => {
    debounce(() => {
      searchByTitle(String(user?.access_token), search).then((result) => {
        if (result instanceof Error) {
          alert("Erro ao pesquisar filmes");
        } else {
          setData(result.content);
        }
      });
    });
  }, [search]);

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
      <ScrollView className="w-full">
        {data.map((movie) => (
          <MovieContainer
            image={movie.posterUrls.original}
            onPress={() => {}}
            title={movie.title}
          />
        ))}
      </ScrollView>
    </BasePage>
  );
}
