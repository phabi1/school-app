import { Component, OnInit } from '@angular/core';
import { Store, ActionsSubject, Action } from '@ngrx/store';
import { Signout, SignoutActionTypes } from '../../actions/signout.actions';
import { filter, first } from 'rxjs/operators';
import { Go } from '../../../../store/actions/router.actions';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent implements OnInit {

  constructor(
    private _actionsSubject: ActionsSubject,
    private _store: Store<any>
  ) { }

  ngOnInit() {
    this._store.dispatch(new Signout());
    this._actionsSubject.asObservable().pipe(
      filter((action: Action) => {
        if (action.type === SignoutActionTypes.SignoutSuccess || action.type === SignoutActionTypes.SignoutFailure) {
          return true;
        }
      }),
      first()
    ).subscribe((action) => {
      if (action.type === SignoutActionTypes.SignoutSuccess) {
        this._store.dispatch(new Go({ path: ['/'] }));
      }
    });
  }

}
