import { Api } from "../axios"

export interface ProfileData {
  birthdate: string;
  email: string;
  enabled: boolean;
  registrationDate: string;
  username: string;
  uuid: string;
}

async function getProfile(accessToken: string): Promise<ProfileData | Error> {
  try {
    const relativeUrl = "/users/my-account"

    const { data } = await Api.get(relativeUrl, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    })

    if (data) return data;

    return new Error("Erro ao carregar perfil")
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message)
  }
}

export {
  getProfile
}
