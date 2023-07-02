import axios from "axios";
import { Environment } from "../../../Environment";
import { errorInterceptor } from "./ErrorInterceptors";
import { responseInterceptor } from "./ResponseInterceptor";

const Api = axios.create({
  baseURL: Environment.URL_BASE,
})

Api.interceptors.response.use(
  (response) => responseInterceptor(response),
  (error) => errorInterceptor(error),
)

export { Api }
