import { AxiosError } from "axios";

export function errorInterceptor(error: AxiosError) {
  console.error(error)
  if (error.message === "Request failed with status code 400") {
    const data = (error.response?.data as {detail: string})

    return Promise.reject(new Error(data.detail))
  }
}
