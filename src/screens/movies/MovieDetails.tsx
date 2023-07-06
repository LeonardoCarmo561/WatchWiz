import { useEffect, useState } from "react";
import { Image, Pressable, Text, View, ScrollView, TextInput } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Skeleton } from "moti/skeleton";

import { useDebounce } from "../../shared/hooks";
import BasePage from "../../shared/components/page/Page";
import Display from "../../shared/components/display/Display";
import { useAuthContext } from "../../shared/contexts/AuthContext";
import { useDetailScreenContext } from "../../shared/contexts/DetailScreenContext";
import {
  Movie,
  getMovieByImdbId,
} from "../../shared/services/api/movies-services";
import { markAsSeen } from "../../shared/services/api";

import { Dimensions } from "react-native";

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

export default function MovieDetails({ navigation }: any) {
  const { detailMovie, postData } = useDetailScreenContext();
  const { debounce } = useDebounce(1500, true);
  const { user } = useAuthContext();

  const [modal, setModal] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [rate, setRate] = useState(100);

  const [limitLines, setLimitLines] = useState(true);

  const [data, setData] = useState<Movie>();

  const handleMarkAsSeen = () => {
    console.log("Aqui");
    const formData: IFormData = {
      genres: data!.genres.map((genre) => genre.name),
      imdbId: data!.imdbId,
      imdbRating: data!.imdbRating,
      overview: data!.overview,
      posterUrl: data!.posterURLs.original,
      runtime: data!.runtime,
      title: data!.title,
      type: data!.type,
      year: data!.year,
    };
    markAsSeen(user!.access_token, formData!, rate).then((result) => {
      if (result instanceof Error) {
        alert("Error");
      } else {
        alert("Deu bom");
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    debounce(() => {
      getMovieByImdbId(String(user?.access_token), detailMovie.imdbId).then(
        (result) => {
          setIsLoading(false);
          if (result instanceof Error) {
            alert("Erro ao carregar dados do filme");
          } else {
            setData(result);
          }
        }
      );
    });
  }, [detailMovie.imdbId]);

  return (
    <BasePage>
      <ScrollView className="w-full h-full">
        <View className="w-full h-[50px] items-center justify-center">
          <Text
            className="font-bold text-purple-500 text-[20px] text-ellipsis text-center"
            numberOfLines={2}
          >
            {data?.title}
          </Text>
        </View>
        <View className="flex-row w-full gap-4">
          <View className="flex w-[120px] h-[160px]">
            {!imageLoaded || (!data && <Skeleton width={120} height={160} />)}
            {data && (
              <Image
                className="
                  w-full
                  h-full
                  rounded-[20px]
                "
                source={{
                  uri: data?.posterURLs.original,
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
            onPress={() => setModal(true)}
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
            <MaterialIcons name="remove-red-eye" size={20} />
            <Text className="text-[18px]">Mark as seen</Text>
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
            <MaterialIcons name="star" size={20} />
            <Text className="text-[18px]">My Rating</Text>
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
          label="General Rate:"
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
            <MaterialIcons color="rgb(168, 85, 247)" name="people" size={30} />
          }
          label="Casts:"
          value={data?.cast.toString() || ""}
        />
      </ScrollView>
      <View
        className={`
          ${modal ? "flex" : "hidden"}
          absolute
          w-full
          h-full
          justify-center
          items-center
          opacity-70
          z-1
          bg-black
        `}
      >
        <View className="
          w-full
          p-4
          bg-purple-300
          bg-opacity-100
          z-2
        ">
          <View 
            className="
              m-4
              w-full
              justify-center
              items-center
              rounded-[20px]
              border-2
              border-purple-950
            "
          >
            <TextInput
              keyboardType="number-pad"
              value={String(rate)}
              onChangeText={(e) => setRate(Number(e))}
              className="
                w-full
                h-full
                p-2
                text-purple-500
                text-[18px]
              "
            />
          </View>
          <View
            id="buttons"
            className="
              flex
              flex-row
              gap-4
              w-full
            "
          >
            <Pressable
              onPress={handleMarkAsSeen}
              className="
                p-2
              bg-purple-700
                rounded-[20px]
                border-2
                border-purple-950
              "
            >
              <Text 
                className="
                  text-white
                  font-bold
                "
              >
                CONFIRM
              </Text>
            </Pressable>
            <Pressable
              onPress={() => {setRate(100); setModal(false)}}
              className="
                p-2
                border-2
                border-x-purple-950
                rounded-[20px]
              "
            >
              <Text>CANCEL</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </BasePage>
  );
}
