import { useEffect, useRef, useState } from "react";
import { ScrollView, Text } from "react-native";

import BasePage from "../../shared/components/page/Page";
import { useAuthContext } from "../../shared/contexts/AuthContext";
import { useDebounce } from "../../shared/hooks";
import { PostContent, getAllPosts } from "../../shared/services/api";
import Post from "../../shared/components/post/Post";
import SearchBox from "../../shared/components/search-box/SearchBox";
import { useDetailScreenContext } from "../../shared/contexts/DetailScreenContext";

export default function Posts({ navigation }: any) {
  const { user } = useAuthContext();
  const { debounce } = useDebounce(1500);
  const { commentPost } = useDetailScreenContext();

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
    <SearchBox
      value={search}
      placeHolder="Pesquise um usuário..."
      setValue={setSearch}
    />
      <ScrollView className="w-full">
        {data.map((post, index) => (
          <Post
            key={index}
            postData={post}
            viewCommentButton
            onCommentPress={() => {
              commentPost.setUuid(post.uuid)
              navigation.navigate("comments-post")
            }}
          />
        ))}
      </ScrollView>
    </BasePage>
  )
}