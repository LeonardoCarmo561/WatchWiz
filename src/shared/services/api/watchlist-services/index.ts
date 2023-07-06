import { Api } from "../axios";
import { Genre } from "../genres-services";
import { Movie } from "../movies-services";

export interface Watchlist {
  content: Movie[];
  numberOfElements: number;
}

export interface WatchedMovie {
  rate: number,
  type: string,
  year: number,
  title: string,
  imdbId: string,
  genres: Genre[],
  runtime: number,
  overview: string,
  posterUrl: string,
  imdbRating: number,
}

interface WatchedList {
  content: WatchedMovie[]
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

async function getWatchedList(accessToken: string, page = 0, size = 10): Promise<WatchedList | Error> {
  try {
    const relativeUrl = `/users/my-account/watched-movies?page=${page}&size=${size}`

    const { data } = await Api.get(relativeUrl, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })

    if (data) return data;

    return new Error("Error while loading watched list movies")
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message)
  }
}

async function markAsSeen(accessToken: string, formData: {}, rate: number | string): Promise<string | Error> {
  try {
    const relativeUrl = `/users/my-account/watched-movies?rate=${rate}`

    const { status } = await Api.post(relativeUrl, formData, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })

    if (status === 200) return "success"

    return new Error("Error while set movie as seen")
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message)
  }
}

export {
  getWatchedList,
  getWatchlist,
  markAsSeen
}
