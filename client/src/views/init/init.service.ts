export class InitService {
  public async init() {
    //setTimeout(async () => {
      return await (window as any).api.init();
    //}, 0);
  }
}
