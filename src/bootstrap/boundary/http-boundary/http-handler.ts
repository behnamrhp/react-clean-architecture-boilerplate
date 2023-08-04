import axios from 'axios';
import { HttpOptions } from './protocols/http-protocols';
import { singleton } from 'tsyringe';

@singleton()
export default class HTTPHandler {
  async request<Response>(options: HttpOptions) {
    const response = await axios<Response>(options);

    return response.data;
  }
}
