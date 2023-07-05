import { Api } from "../axios"
import { UserData } from "../users-services/UserServices";

export interface CommentData {
  postUuid: string,
  text: string,
  uuid: string;
  user: UserData;
}

interface CommentsContent {
  content: CommentData[]
}

async function getCommentsByPost(accessToken: string, uuid: string, page: number = 0, size: number = 5): Promise<CommentsContent | Error> {
  try {
    const relativeUrl = `/posts/${uuid}/comments?page=${page}&size=${size}`

    const { data } = await Api.get(relativeUrl, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })

    if (data) return data;

    return new Error("Erro ao carregar comentários")
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message)
  }
}

async function createComment(accessToken: string, postUuid: string, text: string): Promise<CommentData | Error> {
  try {
    const relativeUrl = `/posts/${postUuid}/comments`

    const { data } = await Api.post(relativeUrl,
      {
        text: text
      }, {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
    })

    if (data) return data

    return new Error("Erro ao postar comentário")
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message)
  }
}

export {
  getCommentsByPost,
  createComment,
}
