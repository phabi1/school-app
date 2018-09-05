import { StudentPictureModule } from './student-picture.module';

describe('StudentPictureModule', () => {
  let studentPictureModule: StudentPictureModule;

  beforeEach(() => {
    studentPictureModule = new StudentPictureModule();
  });

  it('should create an instance', () => {
    expect(studentPictureModule).toBeTruthy();
  });
});
