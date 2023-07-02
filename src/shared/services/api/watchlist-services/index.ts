import { Api } from "../axios";
import { Movie } from "../movies-services";

export interface Watchlist {
  content: Movie[];
  numberOfElements: number;
}

async function getWatchlist(accessToken: string, page: number = 0, size: number = 5): Promise<Watchlist | Error> {
  try {
    const relativeUrl = `/users/my-account/watch-later-movies?page=${page}&size=${size}`

    const { data } = await Api.get(relativeUrl, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })

    if (data) return data;

    return new Error("Erro ao carregar watchlist")
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message)
  }
}

export {
  getWatchlist
}
