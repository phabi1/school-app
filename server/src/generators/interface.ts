export interface IGeneratorResult {
  content: string;
}

export interface IGenerator {
  generate(options?: any): Promise<IGeneratorResult>;
}

export interface IGeneratorConstructable {
  new(): IGenerator;
}
