import { View, Text, Image, Pressable } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { PostContent, unlikePost, likePost } from "../../services/api";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

interface PostProps {
  postData: PostContent;
  onCommentPress?(): void;
  viewCommentButton?: boolean;
}

export default function Post({ postData, viewCommentButton = false, onCommentPress }: PostProps) {

  const { user } = useAuthContext();
  const [liked, setLiked] = useState(false);
  const [firstTime, setFirstTime] = useState(true);

  const [change, setChange] = useState(false);

  console.log(user?.access_token)

  useEffect(() => {
    if (liked && !firstTime) {
      if (change) {
        likePost(String(user?.access_token), postData.uuid)
        .then((result) => {
          if (result instanceof Error) {
            setLiked(false)
          }
        })
        setChange(false)
      }
    } else if (!liked && !firstTime){
      if (change) {
        unlikePost(String(user?.access_token), postData.uuid)
        .then((result) => {
          if (result instanceof Error) {
            setLiked(true)
          }
        })
        setChange(false)
      }
    } else {
      setFirstTime(false)
    }
  }, [liked])

  useEffect(() => {
    setLiked(postData.authenticatedUserLiked)
  }, [postData])

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
      <View className="flex w-full h-[300px] items-center">
        <Image
          className="h-[300px] w-[200px] rounded-[20px]"
          source={{
            uri: postData.moviePosterUrl
          }}
        />
      </View>
      <View className="w-full flex flex-row h-[50px] items-center gap-4">
        <Pressable
          onPress={() => {setLiked((oldValue) => !oldValue); setChange(true)}}
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
        {viewCommentButton && (
          <Pressable onPress={onCommentPress}>
            <MaterialCommunityIcons
              name="comment-outline"
              size={25}
              color="#fff"
            />
          </Pressable>
        )}
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
