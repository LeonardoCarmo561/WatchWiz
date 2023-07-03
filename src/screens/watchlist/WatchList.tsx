import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { View, ScrollView, TextInput, Pressable, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Movie, getWatchlist } from "../../shared/services/api";
import { useAuthContext } from "../../shared/contexts/AuthContext";
import { useDebounce } from "../../shared/hooks";
import { MovieContainer } from "../../shared/components";
import { MotiProgressBar } from "moti";
import { useMovieDetailContext } from "../../shared/contexts/DetailMovieContext";
import BasePage from "../../shared/components/page/Page";

export default function WatchList({ navigation }: any) {
  const { user } = useAuthContext();
  const { debounce } = useDebounce(1000);
  const { imdbId, setImdbId } = useMovieDetailContext();

  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      getWatchlist(String(user?.access_token), page, size).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert("Erro ao carregar watchlist");
        } else {
          setMovies(result.content);
        }
      });
    });
  }, [page, size, search, update]);

  return (
    <BasePage>
      <StatusBar style="light" translucent />
      <View className="p-4 bg-gray-900 flex-row w-full gap-2">
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
        <Pressable
          onPress={() => {
            setUpdate(true);
          }}
          className="
            flex
            w-[50px]
            h-[50px]
            justify-center
            items-center
          "
        >
          <AntDesign
            name="reload1"
            size={30}
            color="rgb(147, 51, 234)"
            className="
              bg-gray-900
            "
          />
        </Pressable>
      </View>
      <View className="flex w-full gap-2">
        {isLoading && (
          <View className="flex w-full items-center h-[50px]">
            <Text className="text-[25px] font-bold text-purple-500">
              Carregando...
            </Text>
          </View>
        )}
        <ScrollView id="movies" className="gap-8 w-full flex" horizontal>
          {movies.map((movie, index) => (
            <MovieContainer
              key={index}
              title={movie.title}
              image={movie.posterUrl!}
              onPress={() => {
                setImdbId(movie.imdbId);
                navigation.navigate("detail");
              }}
            />
          ))}
        </ScrollView>
      </View>
    </BasePage>
  );
}
