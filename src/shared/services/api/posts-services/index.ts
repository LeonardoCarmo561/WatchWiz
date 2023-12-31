import { Api } from "../axios"

export interface PostContent {
  authenticatedUserLiked: boolean,
  creationDate: string,
  moviePosterUrl: string,
  movieRate: number,
  movieTitle: string,
  text: string,
  username: string,
  uuid: string

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

async function likePost(accessToken: string, uuid: string): Promise<string | Error> {
  try {
    const relativeUrl = `/posts/${uuid}/likes`

    const { status } = await Api.post(relativeUrl, {}, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })

    if (status === 200) {
      return "Success"
    }

    return new Error("Erro ao dar like no post")
  } catch (error) {
    console.error(error)
    return new Error("Erro ao dar like")
  }
}

async function unlikePost(accessToken: string, uuid: string): Promise<string | Error> {
  try {
    const relativeUrl = `/posts/${uuid}/likes`

    const { status } = await Api.delete(relativeUrl, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })

    if (status === 200) return "Success";

    return new Error("Erro ao dar like")
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message)
  }
}

async function createNewPost(accessToken: string, formData: {}): Promise<string | Error> {
  try {
    const relativeUrl = `/posts`

    const { status } = await Api.post(relativeUrl, formData, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })

    if (status === 200) return "success"

    return new Error("Error while create post")
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message)
  }
}

export {
  createNewPost,
  getAllPosts,
  unlikePost,
  likePost,
}
