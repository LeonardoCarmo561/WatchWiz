import { View, Text, Image, Pressable } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import { PostContent, unlikePost, likePost } from "../../services/api";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";

interface PostProps {
  postData: PostContent;
  onCommentPress?(): void;
  viewCommentButton?: boolean;
}

export default function Post({
  postData,
  viewCommentButton = false,
  onCommentPress,
}: PostProps) {
  const { user } = useAuthContext();
  const [liked, setLiked] = useState(false);
  const [firstTime, setFirstTime] = useState(true);

  const [change, setChange] = useState(false);

  console.log(user?.access_token);

  useEffect(() => {
    if (liked && !firstTime) {
      if (change) {
        likePost(String(user?.access_token), postData.uuid).then((result) => {
          if (result instanceof Error) {
            setLiked(false);
          }
        });
        setChange(false);
      }
    } else if (!liked && !firstTime) {
      if (change) {
        unlikePost(String(user?.access_token), postData.uuid).then((result) => {
          if (result instanceof Error) {
            setLiked(true);
          }
        });
        setChange(false);
      }
    } else {
      setFirstTime(false);
    }
  }, [liked]);

  useEffect(() => {
    setLiked(postData.authenticatedUserLiked);
  }, [postData]);

  return (
    <View
      className="
        flex
        w-full
      "
    >
      <View className="flex" id="post-container">
        <View
          id="post-header"
          className="
              flex
              pb-2
              flex-col
              border-b-2
              border-b-purple-800
            "
        >
          <View
            id="userdata-container"
            className="
                flex
                gap-4
                w-full
                flex-row
                items-center
              "
          >
            <View
              id="icon-container"
              className="
                  flex
                  h-[40px]
                  w-[40px]
                  border-2
                  items-center
                  rounded-full
                  bg-gray-500
                  justify-center
                  border-gray-300
                "
            >
              <Ionicons name="person" size={25} color="#fff" />
            </View>
            <View
              id="username-container"
              className="
                  flex
                  flex-1
                  h-[40px]
                  justify-center
                "
            >
              <Text className="text-[20px] font-bold text-purple-500">
                {postData.username}
              </Text>
            </View>
          </View>
          <View
            id="rating-container"
            className="
                flex
                gap-1
                w-full
                h-[30px]
                flex-row
                items-center
              "
          >
            <View
              id="icon-container"
              className="
                  flex
                  items-center
                  justify-center
                "
            >
              <Ionicons name="star" size={12} color="#fff" />
            </View>
            <View>
              <Text className="text-white text[12px]">
                Rating: {postData.movieRate}
              </Text>
            </View>
          </View>
        </View>
        <View
          id="image-container"
          className="
              mt-2
              flex
              w-full
              h-[310px]
              items-center
            "
        >
          <Image
            className="
                w-[200px]
                h-[300px]
                rounded-[20px]
              "
            source={{
              uri: postData.moviePosterUrl,
            }}
          />
        </View>
      </View>
      <View className="w-full flex flex-row h-[50px] items-center gap-4">
        <Pressable
          onPress={() => {
            setLiked((oldValue) => !oldValue);
            setChange(true);
          }}
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
  );
}
