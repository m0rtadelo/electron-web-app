import { IResponse } from "../interfaces/response.interface";

export class Service {
    public query = async (data: any): Promise<IResponse> => {
        return await { status: 500 }
    }
    public goHome() {}
}