import { MonthPyramidModule } from './month-pyramid.module';

describe('MonthPyramidModule', () => {
  let monthPyramidModule: MonthPyramidModule;

  beforeEach(() => {
    monthPyramidModule = new MonthPyramidModule();
  });

  it('should create an instance', () => {
    expect(monthPyramidModule).toBeTruthy();
  });
});
