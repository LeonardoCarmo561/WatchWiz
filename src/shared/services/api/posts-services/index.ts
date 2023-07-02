import { Api } from "../axios"

export interface PostContent {
  uuid: string;
  text: string;
  username: string;
  movieTitle: string;
  creationDate: Date;
  moviePostUrl: string;
}

interface PostsData {
  content: PostContent[]
}

async function getAllPosts(accessToken: string, page: number = 0, size: number = 5): Promise<PostsData | Error> {
  try {
    const relativeUrl = `/posts?page=${page}&size=${size}`

    const { data } = await Api.get(relativeUrl, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })

    if (data) return data;

    return new Error("Erro ao carregar posts")
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message)
  }
}

export {
  getAllPosts
}
