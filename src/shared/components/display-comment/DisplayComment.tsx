import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { CommentData } from "../../services/api";

interface DisplayCommentProps {
  commentData: CommentData;
}

export default function DisplayComment({ commentData }: DisplayCommentProps) {
  return (
    <View
      id="comment-container"
      className="
        flex
        w-full
      "
    >
      <View
        id="userdata-container"
        className="
          flex
          gap-2
          w-full
          flex-row
          items-center
        "
      >
        <View
          id="icon-container"
          className="
            flex
            h-[30px]
            w-[30px]
            border-2
            items-center
            rounded-full
            bg-gray-500
            justify-center
            border-gray-300
          "
        >
          <Ionicons name="person" size={15} color="#fff" />
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
          <Text className="text-[15px] font-bold text-purple-500">
            {commentData.user.username}
          </Text>
        </View>
      </View>
      <View className="flex w-full">
        <Text className="wrapper text-white text-[15px]">{commentData.text}</Text>
      </View>
    </View>
  );
}
