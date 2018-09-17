import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Go } from '../../../../../store/actions/router.actions';
import { getCurrentClassId } from '../../../../../store/selectors/class.selectors';
import { Student } from '../../models/student.model';
import { getCurrentStudent, getStudentResults, getSelectedStudents, getDisplayName } from '../../selectors/student.selectors';
import { ToggleSelectionStudent } from '../../actions/student.actions';

@Component({
  selector: 'app-classes-students-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit, OnDestroy {

  public students$: Observable<Student[]>;
  public selectedStudents$: Observable<Student[]>;
  public currentStudent$: Observable<Student>;
  public displayName$: Observable<string>;

  private _currentClassId: string;
  private _currentClassIdChange: Subscription;

  constructor(
    private _store: Store<any>,
  ) {
    this.students$ = this._store.pipe(select(getStudentResults));
    this.selectedStudents$ = this._store.pipe(select(getSelectedStudents));
    this.currentStudent$ = this._store.pipe(select(getCurrentStudent));
    this.displayName$ = this._store.pipe(select(getDisplayName));
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

  onItemSelected(event: Student) {
    this._store.dispatch(new ToggleSelectionStudent({ id: event.id }));
  }

}
