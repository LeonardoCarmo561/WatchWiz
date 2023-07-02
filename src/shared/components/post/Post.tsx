import { View, Text, Image, Pressable } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { PostContent } from "../../services/api";

interface PostProps {
  postData: PostContent;
  viewCommentButton?: boolean;
}

export default function Post({ postData, viewCommentButton = false }: PostProps) {
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
          className="w-full h-[300px]"
          source={{
            uri: postData.moviePostUrl
          }}
        />
      </View>
      <View className="w-full flex flex-row h-[50px] items-center">
        <Pressable
          className="
            flex
          "
        >
          <MaterialCommunityIcons
            name="heart-outline"
            size={25}
            color="#fff"
          />
        </Pressable>
      </View>
    </View>
  )
}
