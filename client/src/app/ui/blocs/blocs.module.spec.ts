import { BlocsModule } from './blocs.module';

describe('BlocModule', () => {
  let blocModule: BlocsModule;

  beforeEach(() => {
    blocModule = new BlocsModule();
  });

  it('should create an instance', () => {
    expect(blocModule).toBeTruthy();
  });
});
