import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store, ActionsSubject, Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter, first } from 'rxjs/operators';
import { AddStudent, StudentActionTypes } from '../../actions/student.actions';
import { GradeOption } from '../../models/grade-option.model';
import { selectAll } from '../../selectors/grade.selectors';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Student } from '../../models/student.model';
import { difference } from 'utils/object';

@Component({
  selector: 'app-classes-students-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  public form: FormGroup;
  public gradeOptions$: Observable<GradeOption[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { student: Student },
    private _actionsSubject: ActionsSubject,
    private _dialogRef: MatDialogRef<AddComponent>,
    private _formBuilder: FormBuilder,
    private _store: Store<any>,
  ) {

    this.gradeOptions$ = this._store.pipe(
      select(selectAll),
      map((levels) => levels.map(level => ({ data: level.id, label: level.title })))
    );

    this.form = this._formBuilder.group({
      picture: [this.data.student.picture],
      firstname: [this.data.student.firstname, Validators.required],
      shortname: [this.data.student.shortname],
      lastname: [this.data.student.lastname, Validators.required],
      sex: [this.data.student.sex],
      birthday: [this.data.student.birthday],
      grade: [this.data.student.grade, Validators.required]
    });
  }

  ngOnInit() {
  }

  onUrlChanged(event: string) {
    this.form.get('pictureUrl').setValue(event);
  }

  add() {
    const values = this.form.value;
    const student = difference(values, this.data.student);
    this._store.dispatch(new AddStudent({ data: student }));
    this._actionsSubject.asObservable().pipe(
      filter((action: Action) => action.type === StudentActionTypes.AddStudentSuccess),
      first())
      .subscribe(() => {
        this._dialogRef.close();
      });
  }

}
