import { AttendanceGridModule } from './attendance-grid.module';

describe('AttendanceGridModule', () => {
  let attendanceGridModule: AttendanceGridModule;

  beforeEach(() => {
    attendanceGridModule = new AttendanceGridModule();
  });

  it('should create an instance', () => {
    expect(attendanceGridModule).toBeTruthy();
  });
});
