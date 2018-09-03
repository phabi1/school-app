import { ChangeDetectionStrategy, Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Go } from '../../../../../store/actions/router.actions';
import { Student } from '../../models/student.model';
import { selectAll } from '../../selectors/student.selectors';

@Component({
  selector: 'app-classes-students-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {

  public students$: Observable<Student[]>;

  constructor(
    private _store: Store<any>
  ) {
    this.students$ = this._store.pipe(select(selectAll));
  }

  onItemClicked(event: Student) {
    this._store.dispatch(new Go({ path: ['/apps/classes/students/' + event.id] }));
  }

}
