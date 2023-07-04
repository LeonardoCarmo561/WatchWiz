import { useEffect, useState } from "react";
import { Image, Pressable, Text, View, ScrollView } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";

import { useDebounce } from "../../shared/hooks";
import BasePage from "../../shared/components/page/Page";
import { useDetailScreenContext } from "../../shared/contexts/DetailScreenContext"
import { Movie, getMovieByImdbId } from "../../shared/services/api/movies-services";
import { useAuthContext } from "../../shared/contexts/AuthContext";
import Display from "../../shared/components/display/Display";

export default function MovieDetails() {
  const { detailMovie } = useDetailScreenContext();
  const { debounce } = useDebounce(1500, true);
  const { user } = useAuthContext();

  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const [limitLines, setLimitLines] = useState(true);

  const [data, setData] = useState<Movie>();

  useEffect(() => {
    setIsLoading(true)
    debounce(() => {
      getMovieByImdbId(String(user?.access_token), detailMovie.imdbId)
      .then((result) => {
        setIsLoading(false)
        if (result instanceof Error) {
          alert("Erro ao carregar dados do filme")
        } else {
          setData(result)
        }
      })
    })
  }, [detailMovie.imdbId])

  return (
    <BasePage>
      <ScrollView className="w-full h-full">
        <View className="w-full h-[50px] items-center justify-center">
          <Text className="font-bold text-purple-500 text-[20px] text-ellipsis text-center" numberOfLines={2}>
            {data?.title}
          </Text>
        </View>
        <View className="flex-row w-full gap-4">
          <View className="flex w-[120px] h-[160px]">
            {!imageLoaded || !data && (
              <Skeleton
                width={120}
                height={160}

              />
            )}
            {data &&(
              <Image
                className="
                  w-full
                  h-full
                  rounded-[20px]
                "
                source={{
                  uri: data?.posterUrls["original"]
                }}
                onLoad={() => setImageLoaded(true)}
              />
            )}
          </View>
          <Pressable
            onPress={() => setLimitLines((oldValue) => !oldValue)}
            className="flex flex-1"
          >
            <Text
              numberOfLines={limitLines ? 8 : undefined}
              className="
                text-purple-700
                text-ellipsis
                text-justify
                text-[16px]
              "
            >
              {data?.overview}
            </Text>
          </Pressable>
        </View>
        <View className="w-full h-[70px] justify-center items-center gap-2 flex-row">
          <Pressable
            className="
            flex
              flex-1
              flex-row
              bg-purple-400
              h-[50px]
              rounded-[20px]
              items-center
              justify-center
            "
          >
            <MaterialIcons
              name="check"
              size={20}
            />
            <Text className="text-[18px]">marcar como visto</Text>
          </Pressable>
          <Pressable
            className="
              flex
              flex-1
              flex-row
              bg-purple-400
              h-[50px]
              rounded-[20px]
              items-center
              justify-center
            "
          >
            <MaterialIcons
              name="star"
              size={20}
            />
            <Text className="text-[18px]">Avaliar</Text>
          </Pressable>
        </View>
        <Display
          icon={
            <MaterialCommunityIcons
              color="rgb(168, 85, 247)"
              name="star"
              size={30}
            />
          }
          label="Rate:"
          value={data?.imdbRating || 100}
        />
        <Display
          icon={
            <MaterialCommunityIcons
              size={30}
              color="rgb(168, 85, 247)"
              name="format-list-bulleted-type"
            />
          }
          label="Genres:"
          value={data?.genres.map((genre) => genre.name).toString() || ""}
        />
        <Display
          icon={
            <MaterialIcons
              color="rgb(168, 85, 247)"
              name="people"
              size={30}
            />
          }
          label="Casts:"
          value={data?.cast.toString() || ""}
        />
      </ScrollView>
    </BasePage>
  )
}