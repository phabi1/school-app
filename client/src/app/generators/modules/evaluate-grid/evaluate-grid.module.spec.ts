import { EvaluateGridModule } from './evaluate-grid.module';

describe('EvaluateGridModule', () => {
  let evaluateGridModule: EvaluateGridModule;

  beforeEach(() => {
    evaluateGridModule = new EvaluateGridModule();
  });

  it('should create an instance', () => {
    expect(evaluateGridModule).toBeTruthy();
  });
});
