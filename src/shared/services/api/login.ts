import { Api } from "./axios"


async function login(formData: {}): Promise<Error | {detail: string}> {
  try {
    const relativeUrl = "/login"

    const { data } = await Api.post(relativeUrl, formData)

    if (data) return data

    return new Error("erro ao fazer login")
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message)
  }
}

export { login }
