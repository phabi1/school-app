import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store, ActionsSubject, Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter, first } from 'rxjs/operators';
import { AddStudent, StudentActionTypes } from '../../actions/student.actions';
import { GradeOption } from '../../models/grade-option.model';
import { selectAll } from '../../selectors/grade.selectors';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-classes-students-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public form: FormGroup;
  public levelOptions$: Observable<GradeOption[]>;

  constructor(
    private _actionsSubject: ActionsSubject,
    private _dialogRef: MatDialogRef<AddComponent>,
    private _formBuilder: FormBuilder,
    private _store: Store<any>,
  ) {

    this.levelOptions$ = this._store.pipe(
      select(selectAll),
      map((levels) => levels.map(level => ({ data: level.id, label: level.title })))
    );

    this.form = this._formBuilder.group({
      picture: [null],
      firstname: [null, Validators.required],
      shortname: [null],
      lastname: [null, Validators.required],
      sex: ['MALE'],
      birthday: [null],
      grade: [null, Validators.required]
    });
  }

  ngOnInit() {
  }

  onUrlChanged(event: string) {
    this.form.get('pictureUrl').setValue(event);
  }

  add() {
    const values = this.form.value;
    const student = { ...values };
    student.shortname = student.shortname || undefined;
    student.birthday = student.birthday || undefined;
    this._store.dispatch(new AddStudent({ data: student }));
    this._actionsSubject.asObservable().pipe(
      filter((action: Action) => action.type === StudentActionTypes.AddStudentSuccess),
      first())
      .subscribe(() => {
        this._dialogRef.close();
      });
  }

}
