import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import BasePage from "../../shared/components/page/Page";
import { useDetailScreenContext } from "../../shared/contexts/DetailScreenContext";

interface IFormData {
  genres: string[];
  imdbId: string;
  imdbRating: number;
  overview: string;
  posterUrl: string;
  runtime: number;
  title: string;
  type: string;
  year: number;
}

export default function WatchedMovieDetails({ navigation }: any) {

  const { watchedData } = useDetailScreenContext();

  return (
    <BasePage>
      <View
        className="
          p-[40px]
        "
      >
        <ScrollView>
          <View className="w-full mb-2">
            <Text className="text-purple-700 text-center font-bold text-[20px] text-ellipsis" numberOfLines={2}>{watchedData.data?.title}</Text>
          </View>
          <View
            className="
              flex-row
              w-full
              gap-2
            "
          >
            <View
              id="image-container"
              className="
                h-[250px]
                w-[150px]
                flex
              "
            >
              <Image
                className="
                  w-[150px]
                  h-[225px]
                  rounded-[20px]
                "
                source={{
                  uri: watchedData.data?.posterUrl
                }}
              />
            </View>
            <View
              className="
                flex-1
              "
            >
              <Text
                className="
                  text-purple-400
                  text-justify
                "
              >
                {watchedData.data?.overview}
              </Text>
            </View>
          </View>

          <View className="w-full h-[65px] justify-center items-center">
            <Pressable
              onPress={() => {
                navigation.navigate("new-post")
              }}
              className="
                h-40px
                p-4
                bg-purple-400
                border-2
                border-purple-950
                rounded-[20px]
              "
            >
              <Text className="text-white font-bold text-[20px]">CREATE A POST</Text>
            </Pressable>
          </View>

          <View className="flex flex-1 w-full gap-1">
            <View className="gap-4 flex-row items-center">
              <Text className="text-purple-700 font-bold text-[18px]">My rating: </Text>
              <View className="flex-row">
                <Text className="text-purple-400 text-[18px] mr-2">{watchedData.data?.rate}</Text>
                <Ionicons
                  color="rgb(192, 132, 252)"
                  name="star"
                  size={18}
                />
              </View>
            </View>

            <View className="gap-4 flex-row items-center">
              <Text className="text-purple-700 font-bold text-[18px]">Imdb rating: </Text>
              <View className="flex-row">
                <Text className="text-purple-400 text-[18px] mr-2">{watchedData.data?.imdbRating}</Text>
                <Ionicons
                  color="rgb(192, 132, 252)"
                  name="star"
                  size={18}
                />
              </View>
            </View>

            <View className="gap-4 flex-row items-center">
              <Text className="text-purple-700 font-bold text-[18px]">Duration time: </Text>
              <View className="flex-row">
                <Text className="text-purple-400 text-[18px] mr-2">{watchedData.data?.runtime}</Text>
                <MaterialCommunityIcons
                  color="rgb(192, 132, 252)"
                  name="clock"
                  size={18}
                />
              </View>
            </View>

            <View className="gap-4 flex-row items-center">
              <Text className="text-purple-700 font-bold text-[18px]">Release year: </Text>
              <View className="flex-row">
                <Text className="text-purple-400 text-[18px] mr-2">{watchedData.data?.year}</Text>
              </View>
            </View>

            <View className="gap-4 flex-row items-center">
              <Text className="text-purple-700 font-bold text-[18px]">Genres: </Text>
              <View className="flex-row">
                <Text className="text-purple-400 text-[18px] mr-2">{watchedData.data?.genres.map((genre) => genre.name).toString()}</Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </BasePage>
  );
}
