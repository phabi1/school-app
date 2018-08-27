import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Redirect } from 'ngrx-auth-store';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { Signin, SigninActionTypes } from '../../actions/signin.actions';
import { getProcessing } from '../../selectors/signin.selectors';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public processing$: Observable<boolean>;
  public form: FormGroup;

  constructor(
    private actionsSubject: ActionsSubject,
    private formBuilder: FormBuilder,
    private store: Store<any>
  ) {
    this.processing$ = this.store.pipe(select(getProcessing));

    this.form = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required])],
      password: [null, Validators.required]
    });
  }

  ngOnInit(): void {
  }

  signin(): void {
    const values = this.form.value;
    const credentials = {
      email: values.email,
      password: values.password
    };
    this.store.dispatch(new Signin({ credentials }));

    this.actionsSubject.asObservable().pipe(
      filter((action) => action.type === SigninActionTypes.SigninSuccess),
      first(),
    ).subscribe(() => this.store.dispatch(new Redirect()));
  }

}
