import { Api } from "../axios"


async function getRecomendations(accessToken: string, page: number = 0, size: number = 5): Promise<any | Error> {
  try {
    const relativeUrl = `/users/my-account/recommendation?page=${page}&size=${size}`

    const { data } = await Api.get(relativeUrl, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });

    if (data) return data

    return new Error("Erro ao carregar recomendações")
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message)
  }
}

export {
  getRecomendations
}
