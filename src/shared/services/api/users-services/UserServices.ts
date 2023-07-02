import { Api } from "../axios"

export interface ICreateUser {
  email: string;
  username: string;
  password: string;
  birthdate?: string;
}

const createUser = async (formData: {}): Promise<ICreateUser | Error> => {
  try {
    const relativeUrl = "/auth/signup"

    const { data } = await Api.post(
      relativeUrl,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        auth: {
          username: "client",
          password: "123"
        }
      }
    )

    if (data) return data;

    return new Error("Erro ao criar usuário")
  } catch (error) {
    console.error(error)
    return new Error((error as {message: string}).message)
  }
}

export {
  createUser
}
