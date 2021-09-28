import { IBucket, IConfig } from '../interfaces/config.interface';

export class Model {
  private config: IConfig;
  public error = '';
  public localFiles = [];
  public remoteFiles = [];
  public remoteRaw = [];
  public get buckets(): Array<IBucket> {
    return this.config?.buckets;
  }
  public hasBucket() {
    return this.config && this.config?.buckets?.length && this.config?.buckets[0].accessKeyId;
  }

  public setConfig(data: IConfig) {
    this.config = data;
  }

  public getConfig() {
    return this.config;
  }
}
