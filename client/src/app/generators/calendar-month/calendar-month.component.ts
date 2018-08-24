import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { CalendarMonthService } from './calendar-month.service';
import { DateService } from '../../core/services/date.service';

@Component({
  selector: 'app-calendar-month',
  templateUrl: './calendar-month.component.html',
  styleUrls: ['./calendar-month.component.scss']
})
export class CalendarMonthComponent implements OnInit {

  public form: FormGroup;
  public monthOptions: { data: number, label: string }[] = [];

  constructor(
    private calendarMonthService: CalendarMonthService,
    private dateService: DateService,
    private formBuilder: FormBuilder,
  ) {
    this.monthOptions = this.dateService.getMonthOptions();
  }

  ngOnInit() {
    this.form = this.createForm();
  }

  generate(): void {

    const values = this.form.value;

    this.calendarMonthService.generate({
      month: values.month,
      year: values.year
    });
  }

private createForm (): FormGroup {
  const now = moment();
  return this.formBuilder.group({
    month: [now.month(), Validators.compose([Validators.required])],
    year: [now.year(), Validators.compose([Validators.required, Validators.pattern('[0-9]*')])],
    outDays: ['']
  });
}

}
