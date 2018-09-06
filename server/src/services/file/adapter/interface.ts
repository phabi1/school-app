export interface IAdapter {
  getLocalPath(uri: string): string;
  getExternalUrl(uri: string): string;
}

export interface IAdapterConstructable {
  new(): IAdapter;
}
