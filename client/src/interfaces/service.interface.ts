import { IResponse } from "./response.interface";

export interface IService {
  query: (any) => Promise<IResponse>;
}