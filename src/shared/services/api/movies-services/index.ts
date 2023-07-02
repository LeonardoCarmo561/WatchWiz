import { Api } from "../axios";
import { Genre } from "../genres-services";

export interface Movie {
  title: string;
  imdbId: string;
  cast: string[];
  genres: Genre[];
  overview: string;
  posterUrl?: string;
  imdbRating: number;
  posterUrls: {
    original: string;
  }
}

async function getMovieByImdbId(accessToken: string, imdbId: string, country: string = "us") {
  try {
    const relativeUrl = `/movies/get?country=${country}&imdb_id=${imdbId}`

    const { data } = await Api.get(relativeUrl, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })

    if (data) return data;

    return new Error("Erro ao carregar dados do filme")
  } catch (error) {
    console.error(error)
    return new Error((error as { message: string }).message)
  }
}

export {
  getMovieByImdbId
}
