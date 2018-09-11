import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MonthPyramidService } from '../../services/month-pyramid.service';
import { Generate } from '../../actions/month-pyramid.actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(
    private _store: Store<any>,
  ) { }

  ngOnInit(): void { }

  public generate(): void {
    this._store.dispatch(new Generate());
  }

}
