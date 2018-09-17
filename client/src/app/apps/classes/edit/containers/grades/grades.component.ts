import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, FormBuilder } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Grade } from '../../models/grade.model';
import { getGrades, getState } from '../../selectors/grades.selectors';
import { Load } from '../../actions/grades.actions';

@Component({
  selector: 'app-classes-edit-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {

  public grades$: Observable<Grade[]>;

  multiGradeCtrl: FormControl;
  gradeCtrl: FormControl;
  gradesCtrl: FormControl;

  get invalid() {
    if (this.multiGradeCtrl.value) {
      return this.gradesCtrl.invalid;
    } else {
      return this.gradeCtrl.invalid;
    }
  }

  constructor(
    private _formBuilder: FormBuilder,
    private store: Store<any>,
  ) {

    this.multiGradeCtrl = this._formBuilder.control(false);
    this.gradeCtrl = this._formBuilder.control(null, Validators.required);
    this.gradesCtrl = this._formBuilder.control([], this.lengthValidation());

    this.grades$ = this.store.pipe(select(getGrades));
  }

  ngOnInit() {
    this.store.dispatch(new Load());

    this.store.pipe(select(getState)).subscribe((state) => {
      this.multiGradeCtrl.setValue(state.multiple);
      this.gradeCtrl.setValue(state.ids.length > 0 ? state.ids[0] : null);
      this.gradesCtrl.setValue(state.ids);
    });
  }

  protected lengthValidation(): ValidatorFn {
    return (ctrl: AbstractControl) => {
      const value = ctrl.value;
      if (value.length > 0) {
        return null;
      }
      return { minLengthArray: true };
    };
  }

}
