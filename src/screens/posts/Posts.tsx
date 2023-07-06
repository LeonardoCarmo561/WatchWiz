import { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import BasePage from "../../shared/components/page/Page";
import { useAuthContext } from "../../shared/contexts/AuthContext";
import { useDebounce } from "../../shared/hooks";
import { PostContent, getAllPosts } from "../../shared/services/api";
import Post from "../../shared/components/post/Post";
import SearchBox from "../../shared/components/search-box/SearchBox";
import { useDetailScreenContext } from "../../shared/contexts/DetailScreenContext";
import Divider from "../../shared/components/divider/Divider";

export default function Posts({ navigation }: any) {
  const { user } = useAuthContext();
  const { debounce } = useDebounce(1500);
  const { commentPost, postData } = useDetailScreenContext();

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  const [search, setSearch] = useState("");

  const [data, setData] = useState<PostContent[]>([]);

  useEffect(() => {
    debounce(() => {
      getAllPosts(String(user?.access_token), page, size)
      .then((result) => {
        if (result instanceof Error) {
          alert("Erro ao carregar posts")
        } else {
          setData(result.content)
        }
      })
    })
  }, [page, size])

  return (
    <BasePage>
    <View className="p-4 pt-8">
      <SearchBox
        value={search}
        placeHolder="Pesquise um usuário..."
        setValue={setSearch}
      />
      <ScrollView className="w-full">
        {data.map((post, index) => (
          <View className="pb-6">
            <Post
              key={index}
              postData={post}
              viewCommentButton
              onCommentPress={() => {
                commentPost.setUuid(post.uuid)
                postData.setData(post)
                navigation.navigate("comments-post")
              }}
            />
            <View className="pt-1">
              <Divider />
            </View>
          </View>
        ))}
      </ScrollView>
      </View>
    </BasePage>
  )
}