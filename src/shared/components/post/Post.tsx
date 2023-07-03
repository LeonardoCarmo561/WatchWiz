import { View, Text, Image, Pressable } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { PostContent, unlikePost, likePost } from "../../services/api";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

interface PostProps {
  postData: PostContent;
  viewCommentButton?: boolean;
}

export default function Post({ postData, viewCommentButton = false }: PostProps) {

  const { user } = useAuthContext();
  const [firstTime, setFirstTime] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (liked && !firstTime) {
      likePost(String(user?.access_token), postData.uuid)
      .then((result) => {
        if (result instanceof Error) {
        }
      })
    } else if (!liked && !firstTime){
      unlikePost(String(user?.access_token), postData.uuid)
      .then((result) => {
        if (result instanceof Error) {
        }
      })
    } else {
      setFirstTime(false)
    }
  }, [liked])

  return (
    <View
      className="
        flex
        w-full
        border-t-[1px]
        border-t-purple-700
        mb-4
      "
    >
      <View
        className="
          w-full
          h-[40px]
        "
      >
        <Text
          className="
            text-purple-500
            text-[16px]
          "
        >{postData.username}</Text>
      </View>
      <View className="flex w-full">
        <Image
          className="w-full h-[300px] rounded-[20px]"
          source={{
            uri: postData.moviePosterUrl
          }}
        />
      </View>
      <View className="w-full flex flex-row h-[50px] items-center gap-4">
        <Pressable
          onPress={() => setLiked((oldValue) => !oldValue)}
          className="
            flex
          "
        >
          <MaterialCommunityIcons
            name={liked ? "heart" : "heart-outline"}
            size={25}
            color="#fff"
          />
        </Pressable>
        <Pressable>
          <MaterialCommunityIcons
            name="comment-outline"
            size={25}
            color="#fff"
          />
        </Pressable>
      </View>
      <View className="w-full">
        <Text
          className="
            text-white
            text-[14px]
          "
        >
          {postData.text}
        </Text>
      </View>
    </View>
  )
}
