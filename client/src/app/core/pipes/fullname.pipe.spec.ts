import { FullnamePipe } from './fullname.pipe';

describe('FullnamePipe', () => {
  it('create an instance', () => {
    const pipe = new FullnamePipe(null);
    expect(pipe).toBeTruthy();
  });
});
