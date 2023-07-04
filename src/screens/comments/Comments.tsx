import { ScrollView, Text } from "react-native";
import BasePage from "../../shared/components/page/Page";
import { useDetailScreenContext } from "../../shared/contexts/DetailScreenContext";
import { useEffect, useState } from "react";
import Post from "../../shared/components/post/Post";
import { Comment, getCommentsByPost } from "../../shared/services/api/comments-services";
import { useAuthContext } from "../../shared/contexts/AuthContext";

export default function Comments() {
  const { commentPost } = useDetailScreenContext();
  const { user } = useAuthContext();

  const [data, setData] = useState<Comment[]>([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  console.log(commentPost.uuid)

  useEffect(() => {
    if (commentPost.uuid) {
      getCommentsByPost(String(user?.access_token), commentPost.uuid, page, size)
      .then((result) => {
        if (result instanceof Error) {
          alert("Erro ao carregar comentários")
        } else {
          setData(result.content)
        }
      })
    }
  }, [commentPost.uuid, page, size])

  return (
    <BasePage>
      <ScrollView>
        {data.map((comment) => (
          <Text>{comment.text}</Text>
        ))}
      </ScrollView>
    </BasePage>
  )
}
