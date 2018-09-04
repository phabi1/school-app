import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Go } from '../../../../../store/actions/router.actions';
import { getCurrentClassId } from '../../../../../store/selectors/class.selectors';
import { Student } from '../../models/student.model';
import { selectAll } from '../../selectors/student.selectors';

@Component({
  selector: 'app-classes-students-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit, OnDestroy {

  public students$: Observable<Student[]>;

  private _currentClassId: string;
  private _currentClassIdChange: Subscription;

  constructor(
    private _store: Store<any>,
  ) {
    this.students$ = this._store.pipe(
      select(selectAll),
    );
  }

  ngOnInit(): void {
    this._currentClassIdChange = this._store
      .pipe(
        select(getCurrentClassId)
      )
      .subscribe((currentClassId) => {
        this._currentClassId = currentClassId;
      });
  }

  ngOnDestroy(): void {
    this._currentClassIdChange.unsubscribe();
  }

  onItemClicked(event: Student) {
    this._store.dispatch(new Go({ path: ['/apps/classes/' + this._currentClassId + '/students/' + event.id] }));
  }

}
