import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UpdateStudent } from '../../actions/student.actions';
import { GradeOption } from '../../models/grade-option.model';
import { selectAll } from '../../selectors/grade.selectors';

@Component({
  selector: 'app-classes-students-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  public form: FormGroup;
  public levelOptions$: Observable<GradeOption[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _store: Store<any>
  ) {
    this.levelOptions$ = this._store.pipe(
      select(selectAll),
      map((levels) => levels.map((level) => ({ data: level.id, label: level.title })))
    );

    const student = this.data.student;

    this.form = this._formBuilder.group({
      level: [student.level, Validators.required],
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
    this._store.dispatch(new UpdateStudent({ id: this.data.student.id, data: values }));
  }

}
