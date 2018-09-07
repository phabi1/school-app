import { FirstnameLabelModule } from './firstname-label.module';

describe('FirstnameLabelModule', () => {
  let firstnameLabelModule: FirstnameLabelModule;

  beforeEach(() => {
    firstnameLabelModule = new FirstnameLabelModule();
  });

  it('should create an instance', () => {
    expect(firstnameLabelModule).toBeTruthy();
  });
});
