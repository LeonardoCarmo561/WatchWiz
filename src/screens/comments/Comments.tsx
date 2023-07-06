import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import BasePage from "../../shared/components/page/Page";
import { useDetailScreenContext } from "../../shared/contexts/DetailScreenContext";
import { useEffect, useState } from "react";
import { CommentData, createComment, getCommentsByPost } from "../../shared/services/api";
import { useAuthContext } from "../../shared/contexts/AuthContext";
import SearchBox from "../../shared/components/search-box/SearchBox";
import Post from "../../shared/components/post/Post";
import Divider from "../../shared/components/divider/Divider";
import DisplayComment from "../../shared/components/display-comment/DisplayComment";

export default function Comments() {
  const { commentPost, postData } = useDetailScreenContext();
  const { user } = useAuthContext();

  const [data, setData] = useState<CommentData[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const [update, setUpdate] = useState(true);

  const [text, setText] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const handleCreateComment = () => {
    setIsLoading(true)
    createComment(user!.access_token, postData.data!.uuid, text)
    .then((result) => {
      if (result instanceof Error) {
        alert("Erro ao criar comentário")
        setIsLoading(false)
      } else {
        setUpdate(true)
        setText("")
      }
    })
  }

  useEffect(() => {
    if (commentPost.uuid) {
      setUpdate(false)
      getCommentsByPost(String(user?.access_token), commentPost.uuid, page, size)
      .then((result) => {
        setIsLoading(false)
        if (result instanceof Error) {
          alert("Erro ao carregar comentários")
        } else {
          setData(result.content)
        }
      })
    }
  }, [commentPost.uuid, page, size, update])

  return (
    <BasePage>
    <View className="p-4 pt-8 pb-[60px]">
      <ScrollView>
        <Post
          postData={postData.data!}
        />
        <View className="pt-1">
          <Divider />
        </View>
        <View className="pt-2">
          <Text className="text-white">
            comments:
          </Text>
        </View>
        {data.map((comment, index) => (
          <View key={index} className="py-2">
            <DisplayComment commentData={comment} />
            {data.length !== index + 1 && (
              <View className="pt-1">
                <Divider color="gray-500" />
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      <View className="flex-row relative">
        <SearchBox
          useEndIcon
          disabled={isLoading}
          placeHolder="Type your comment here..."
          setValue={setText}
          value={text}
        />
        <Pressable
          className="
            right-4
            absolute
            w-[40px]
            h-[40px]
          "
          onPress={text !== "" ? handleCreateComment : undefined}
        >
          <View className="w-[50px] h-[50px] flex justify-center items-center">
            <Ionicons
              size={25}
              name="send"
              color="#fff"
            />
          </View>
        </Pressable>
      </View>
      </View>
    </BasePage>
  )
}
