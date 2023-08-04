import axios from "axios";
import { singleton } from "tsyringe";
import { HttpOptions } from "./protocols/http-protocols";

@singleton()
export default class HTTPHandler {
  async request<Response>(options: HttpOptions) {
    const response = await axios<Response>(options);

    return response.data;
  }
}
