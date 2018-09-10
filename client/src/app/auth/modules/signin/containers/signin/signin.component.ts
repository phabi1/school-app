import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { FuseConfigService } from '@fuse/services/config.service';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Redirect } from 'ngrx-auth-store';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { Signin, SigninActionTypes } from '../../actions/signin.actions';
import { getProcessing } from '../../selectors/signin.selectors';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations   : fuseAnimations
})
export class SigninComponent implements OnInit {

  public processing$: Observable<boolean>;
  public form: FormGroup;

  constructor(
    private _actionsSubject: ActionsSubject,
    private _formBuilder: FormBuilder,
    private _fuseConfigService: FuseConfigService,
    private _store: Store<any>
  ) {

    this._fuseConfigService.setConfig({
      layout: {
        toolbar: {
          hidden: true,
        },
        navbar: {
          hidden: true,
        },
        footer: {
          hidden: true,
        }
      }
    });

    this.processing$ = this._store.pipe(select(getProcessing));

    this.form = this._formBuilder.group({
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
    this._store.dispatch(new Signin({ credentials }));

    this._actionsSubject.asObservable().pipe(
      filter((action) => action.type === SigninActionTypes.SigninSuccess),
      first(),
    ).subscribe(() => this._store.dispatch(new Redirect()));
  }

}
