import axios from "axios";
import { Environment } from "../../../Environment";

const Api = axios.create({
  baseURL: Environment.URL_BASE,
  withCredentials: true
})

export { Api }
