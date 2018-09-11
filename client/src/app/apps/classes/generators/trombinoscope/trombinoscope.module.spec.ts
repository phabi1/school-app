import { TrombinoscopeModule } from './trombinoscope.module';

describe('TrombinoscopeModule', () => {
  let trombinoscopeModule: TrombinoscopeModule;

  beforeEach(() => {
    trombinoscopeModule = new TrombinoscopeModule();
  });

  it('should create an instance', () => {
    expect(trombinoscopeModule).toBeTruthy();
  });
});
