import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Generate } from '../../actions/form.actions';
import { Layout } from '../../models/layout.model';
import { selectAll as getLayouts } from '../../selectors/layout.selectors';
import { selectAll as getStudents } from '../../selectors/student.selectors';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public form: FormGroup;

  public layouts$: Observable<Layout[]>;
  public students$: Observable<Student[]>;
  public students: Student[];

  public get studentControls(): FormArray {
    return this.form.get('students') as FormArray;
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _store: Store<any>
  ) {
    this.layouts$ = this._store.pipe(select(getLayouts));
    this.students$ = this._store.pipe(select(getStudents));
  }

  ngOnInit(): void {
    this.createForm();

    this.students$
      .subscribe((students) => {
        this.students = students;
        const arr = students.map((student) => this._formBuilder.control(false));
        this.form.setControl('students', this._formBuilder.array(arr));
      });
  }

  generate(): void {
    const values = this.form.value;
    const students = [];
    values.students.forEach((selected, i) => {
      if (selected) {
        students.push(this.students[i].id);
      }
    });
    this._store.dispatch(new Generate({ layout: { type: values.layout }, students }));
  }

  private createForm(): void {
    this.form = this._formBuilder.group({
      layout: [null, Validators.required],
      students: this._formBuilder.array([]),
    });
  }
}
