import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddStudent } from '../../actions/student.actions';
import { selectAll } from '../../selectors/level.selectors';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public form: FormGroup;
  public levelOptions$: Observable<any[]>;

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<any>,
  ) {

    this.levelOptions$ = this._store.pipe(
      select(selectAll),
      map((levels) => levels.map(level => ({ data: level.id, label: level.title })))
    );

    this.form = this._formBuilder.group({
      firstname: [null, Validators.required],
      shortname: [null],
      lastname: [null, Validators.required],
      sex: ['MALE'],
      birthday: [null],
      level: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  add() {
    const values = this.form.value;
    const student = { ...values };
    this._store.dispatch(new AddStudent({ data: student }));
  }

}
