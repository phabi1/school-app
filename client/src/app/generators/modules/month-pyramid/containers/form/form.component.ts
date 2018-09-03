import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MonthPyramidService } from '../../services/month-pyramid.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(
    private store: Store<any>,
    private monthPyramidService: MonthPyramidService
  ) { }

  ngOnInit(): void { }

  public generate(): void {
    this.monthPyramidService.generate().subscribe(() => { });
  }

}
