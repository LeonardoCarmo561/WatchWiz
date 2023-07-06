import { View, TextInput, ScrollView, Text } from "react-native";
import { useEffect, useRef, useState } from "react";

import BasePage from "../../shared/components/page/Page";
import { useDebounce } from "../../shared/hooks";
import { Movie, searchByTitle } from "../../shared/services/api";
import { useAuthContext } from "../../shared/contexts/AuthContext";
import { MovieContainer } from "../../shared/components";
import { useDetailScreenContext } from "../../shared/contexts/DetailScreenContext";

export default function Search({ navigation }: any) {
  const { debounce } = useDebounce(1500);
  const { user } = useAuthContext();
  const { detailMovie } = useDetailScreenContext();

  const [page, setPage] = useState(0)
  const [size, setSize] = useState(30)
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Movie[]>([]);
  const [multiData, setMultiData] = useState<Movie[]>([]);

  // const lastSearchRef = useRef("");

  useEffect(() => {
    debounce(() => {
      searchByTitle(String(user?.access_token), search, "us", page, size).then((result) => {
        if (result instanceof Error) {
          alert("Erro ao pesquisar filmes");
        } else {
          setData(result.content);
        }
      });
    });
  }, [search, size, page]);

  // useEffect(() => {
  //   if (lastSearchRef.current !== search) {
  //     lastSearchRef.current = search
  //     setMultiData(data)
  //     if (data.length === size) {
  //       setPage((oldvalue) => oldvalue + 1)
  //     }
  //   } else {
  //     setMultiData((oldValue) => [...oldValue, ...data])
  //     if (data.length === size) {
  //       setPage((oldvalue) => oldvalue + 1)
  //     }
  //   }
  // }, [data])

  console.log(user?.access_token)

  return (
    <BasePage>
    <View className="p-4 pt-8">
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
      <ScrollView className="mt-3">
        <View className="flex-row flex-wrap w-full justify-center items-center">
          {data.map((movie, index) => (
            <View key={index} className="p-3">
              <MovieContainer
                image={movie.posterURLs.original}
                onPress={() => {
                  detailMovie.setImdbId(movie.imdbId)
                  navigation.navigate("search-movie-details")
                }}
                title={movie.title}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      </View>
    </BasePage>
  );
}
