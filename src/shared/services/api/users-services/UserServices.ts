import { Api } from "../axios"

interface ICreateUser {
  email: string;
  username: string;
  password: string;
  birthdate: string;
}

const createUser = async (formData: ICreateUser): Promise<any> => {
  try {
    const relativeUrl = `/auth/signup`

    const { data } = await Api.post(relativeUrl, formData)

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
