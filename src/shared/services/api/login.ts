import { Api } from "./axios"

interface UserData {
  access_token: string;
  refresh_token: string;
}

const login = async (formData: {}): Promise<UserData | Error> => {
  try {
    const relativeUrl = "/oauth/token"

    const { data } = await Api.post(relativeUrl, formData, {
      auth: {
        username: "client",
        password: "123"
      },
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })

    if (data) return data;

    return new Error("Erro ao voltar string")
  } catch (error) {
    console.error(error)
    return new Error("Erro")
  }
}

async function refreshAccessToken(refreshToken: string): Promise<UserData | Error> {
  try {
    const relativeUlr = "/oauth/token"

    const { data } = await Api.post(relativeUlr, {
      refresh_token: refreshToken,
      grant_type: "refresh_token"
    }, {
      auth: {
        username: "client",
        password: "123"
      },
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })

    if (data) return data;

    return new Error("Erro ao atulizar token")
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message)
  }
}

export { 
  login,
  refreshAccessToken,
}
