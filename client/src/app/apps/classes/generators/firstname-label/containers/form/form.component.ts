import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Generate } from '../../actions/form.actions';
import { DeselectGrade, SelectGrade } from '../../actions/grade.actions';
import { Grade } from '../../models/grade.model';
import { Layout } from '../../models/layout.model';
import { Student } from '../../models/student.model';
import { selectAll } from '../../selectors/grade.selectors';
import { selectAll as getLayouts } from '../../selectors/layout.selectors';
import { getSelectedStudents, selectAll as getStudents, getSelectedIds } from '../../selectors/student.selectors';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormComponent implements OnInit {

  private initialStudentIds: string[];

  public form: FormGroup;

  public layouts$: Observable<Layout[]>;
  public students$: Observable<Student[]>;
  public selectedStudentIds$: Observable<string[]>;
  public grades$: Observable<Grade[]>;
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
    this.selectedStudentIds$ = this._store.pipe(select(getSelectedIds));
    this.grades$ = this._store.pipe(select(selectAll));
  }

  public compareGrades(a, b): boolean {
    console.log(a, b);
    return true;
  }

  ngOnInit(): void {

    this.createForm();

    this.students$
      .subscribe((students) => {
        this.students = students;
        const arr = students.map((student) => {
          return this._formBuilder.control(false);
        });
        this.form.setControl('students', this._formBuilder.array(arr));
      });


    this.selectedStudentIds$
      .subscribe((selectedStudents) => {
        (this.form.get('students') as FormArray).controls.forEach((ctrl, i) => {
          const student = this.students[i];
          const checked = selectedStudents.includes(student.id);
          ctrl.setValue(checked);
        });
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

  toggleSelectGrade(grade: Grade): void {
    let action;
    if (grade.selected) {
      action = new DeselectGrade({ id: grade.id });
    } else {
      action = new SelectGrade({ id: grade.id });
    }

    this._store.dispatch(action);
  }

  private createForm(): void {
    this.form = this._formBuilder.group({
      layout: [null, Validators.required],
      students: this._formBuilder.array([]),
    });
  }
}
