import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, View, Image, Pressable, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Movie, getRecomendations } from "../../shared/services/api";
import { useAuthContext } from "../../shared/contexts/AuthContext";
import { MovieContainer } from "../../shared/components";
import { useDetailScreenContext } from "../../shared/contexts/DetailScreenContext";

export default function Home({ navigation }: any) {
  const { user } = useAuthContext();
  const { detailMovie } = useDetailScreenContext();

  const [recomendations, setRecomendations] = useState<Movie[]>([]);
  const [currentMovie, setCurrentMovie] = useState<Movie>();

  const [getNewMovie, setGetNewMovie] = useState(true);

  useEffect(() => {
    getRecomendations(String(user?.access_token), 0, 10).then((result) => {
      if (result instanceof Error) {
        alert("Erro");
      } else {
        setRecomendations(result.content);
      }
    });
  }, []);

  useEffect(() => {
    if (getNewMovie) {
      getRecomendations(String(user?.access_token), 0, 1).then((result) => {
        setGetNewMovie(false);
        if (result instanceof Error) {
          alert("Erro ao carrgar filme");
        } else {
          setCurrentMovie(result.content[0]);
        }
      });
    }
  }, [getNewMovie]);

  console.log(user?.access_token);

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
      <StatusBar style="light" translucent />
      <ScrollView>
        <View className="flex flex-row gap-2 w-full">
          <View className="h-[225px] w-[150px] border-black border-[.5px] rounded-[20px]">
            <Image
              className="w-full h-full rounded-[20px]"
              source={{
                uri: currentMovie?.posterUrl || "",
              }}
            />
          </View>
          <View className="flex flex-1">
            <Text
              className="
                text-center
                text-ellipsis
                text-purple-500
                font-bold
                text-[17px]
              "
              numberOfLines={2}
            >
              {currentMovie?.title || ""}
            </Text>
            <Text
              className="
                text-purple-700
                text-[15px]
                text-justify
              "
              numberOfLines={10}
            >
              {currentMovie?.overview || ""}
            </Text>
          </View>
        </View>
        <Pressable
          className="mt-4 flex justify-center items-center rounded-[20px] bg-purple-600 w-full h-[50px] border-purple-600 border-[2px]"
          onPress={() => setGetNewMovie(true)}
        >
          <Text className="text-white font-bold text-[20px]">
            Sortear outro
          </Text>
        </Pressable>
        <View className="gap-y-2 mt-2">
          <View className="flex flex-1 flex-row justify-between items-center">
            <Text className="text-[25px] font-bold text-purple-600">
              Veja Também
            </Text>
            <Feather name="arrow-right" color="rgb(147, 51, 234)" size={30} />
          </View>
          <ScrollView
            horizontal
            className="gap-2"
            showsHorizontalScrollIndicator={false}
          >
            <View className="h-[150px] w-[100px] border-black border-[.5px] rounded-[20px]">
              <Image
                className="w-full h-full rounded-[20px]"
                source={{
                  uri: "https://i.pinimg.com/originals/ed/ff/ac/edffac2e5c812bb7db9b1de2412929bf.jpg",
                }}
              />
            </View>
            <View className="h-[150px] w-[100px] border-black border-[.5px] rounded-[20px]">
              <Image
                className="w-full h-full rounded-[20px]"
                source={{
                  uri: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/083/509/products/operacao-baba1-3c98a7dbedca009f6116692179396040-640-0.webp",
                }}
              />
            </View>
            <View className="h-[150px] w-[100px] border-black border-[.5px] rounded-[20px]">
              <Image
                className="w-full h-full rounded-[20px]"
                source={{
                  uri: "https://br.web.img3.acsta.net/c_310_420/medias/nmedia/18/93/75/86/20275816.jpg",
                }}
              />
            </View>
            <View className="h-[150px] w-[100px] border-black border-[.5px] rounded-[20px]">
              <Image
                className="w-full h-full rounded-[20px]"
                source={{
                  uri: "data:image/jpeg;base64,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",
                }}
              />
            </View>
          </ScrollView>
        </View>
        <View className="gap-y-2 mt-2">
          <View className="flex flex-1 flex-row justify-between items-center">
            <Text className="text-[25px] font-bold text-purple-600">
              Filmes que você pode gostar
            </Text>
            <Feather name="arrow-right" color="rgb(147, 51, 234)" size={30} />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="">
            {recomendations.map((movie, index) => (
              <MovieContainer
                key={index}
                image={movie.posterUrl!}
                onPress={() => {
                  detailMovie.setImdbId(movie.imdbId)
                  navigation.navigate("details-movie-home")
                }}
                title={movie.title}
              />
            ))}
            <Pressable
              onPress={() => {}}
              className="w-[110px] mb-5 mx-5 flex items-center gap-1"
            >
              <View className="h-[150px] w-[100px] flex items-center justify-center bg-black opacity-50 border-[.5px] rounded-[20px]">
                <Text className="font-bold text-white">Veja mais...</Text>
              </View>
            </Pressable>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
