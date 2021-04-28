import { IResponse } from "../interfaces/response.interface";
import { IService } from "../interfaces/service.interface";

export class Service implements IService {
  public query = async (data: any): Promise<IResponse> => {
      return await { status: 500 }
  }
}