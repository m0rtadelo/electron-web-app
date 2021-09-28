export interface IModel {
  local: IHolder,
  remote: IHolder,
}

export interface IHolder {
  path: string,
  contents: Array<IContent>,
}

export interface IContent {
  key: string,
  size: number,
  modified: Date,
  etag: string,
}
