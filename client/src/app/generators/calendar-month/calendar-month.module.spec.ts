import { CalendarMonthModule } from './calendar-month.module';

describe('CalendarMonthModule', () => {
  let calendarMonthModule: CalendarMonthModule;

  beforeEach(() => {
    calendarMonthModule = new CalendarMonthModule();
  });

  it('should create an instance', () => {
    expect(calendarMonthModule).toBeTruthy();
  });
});
