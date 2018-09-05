import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { select, Store, ActionsSubject, Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter, first } from 'rxjs/operators';
import { UpdateStudent, StudentActionTypes } from '../../actions/student.actions';
import { GradeOption } from '../../models/grade-option.model';
import { selectAll } from '../../selectors/grade.selectors';
import { difference } from 'utils/object';

@Component({
  selector: 'app-classes-students-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  public form: FormGroup;
  public gradeOptions$: Observable<GradeOption[]>;

  constructor(
    private _actionsSubject: ActionsSubject,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<UpdateComponent>,
    private _formBuilder: FormBuilder,
    private _store: Store<any>
  ) {

    this.gradeOptions$ = this._store.pipe(
      select(selectAll),
      map((grades) => grades.map((grade) => ({ data: grade.id, label: grade.title })))
    );

    const student = this.data.student;

    this.form = this._formBuilder.group({
      grade: [student.grade, Validators.required],
      firstname: [student.firstname, Validators.required],
      lastname: [student.lastname, Validators.required],
      shortname: [student.shortname],
      sex: [student.sex],
      birthday: [student.birthday],
      notes: [student.notes]
    });
  }

  ngOnInit() {
  }

  update(): void {
    const values = this.form.value;
    const data = difference(values, this.data.student);
    this._store.dispatch(new UpdateStudent({ id: this.data.student.id, data }));
    this._actionsSubject.asObservable().pipe(
      filter((action: Action) => action.type === StudentActionTypes.UpdateStudentSuccess),
      first())
      .subscribe(() => {
        this._dialogRef.close();
      });
  }

}
