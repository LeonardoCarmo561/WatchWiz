import { useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";

import BasePage from "../../shared/components/page/Page";
import { useAuthContext } from "../../shared/contexts/AuthContext";
import { useDebounce } from "../../shared/hooks";
import { PostContent, getAllPosts } from "../../shared/services/api";
import Post from "../../shared/components/post/Post";

export default function Posts() {
  const { user } = useAuthContext();
  const { debounce } = useDebounce(1500);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

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
      <ScrollView className="w-full">
        {data.map((post) => (
          <Post
            postData={post}
            viewCommentButton
          />
        ))}
      </ScrollView>
    </BasePage>
  )
}