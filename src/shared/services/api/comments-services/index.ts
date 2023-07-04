import { Api } from "../axios"

export interface Comment {
  text: string;
  uuid: string;
  postUuid: string;
  userUuid: string;
}

interface CommentsContent {
  content: Comment[]
}

async function getCommentsByPost(accessToken: string, uuid: string, page: number = 0, size: number = 10): Promise<CommentsContent | Error> {
  try {
    const relativeUrl = `/posts/${uuid}/comments?page${page}&size=${size}`

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

export {
  getCommentsByPost
}
