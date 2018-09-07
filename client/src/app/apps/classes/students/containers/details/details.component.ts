import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Student } from '../../models/student.model';
import { getCurrentStudent } from '../../selectors/student.selectors';
import { MatDialog } from '@angular/material';
import { UpdateComponent } from '../update/update.component';
import { ShowUpdateForm, ConfirmDeleteStudents } from '../../actions/student.actions';

@Component({
  selector: 'app-classes-students-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit {

  public currentStudent$: Observable<Student>;

  constructor(
    private _store: Store<any>
  ) {
    this.currentStudent$ = this._store.pipe(select(getCurrentStudent));
  }

  ngOnInit() {
  }

  onAction(event: any): void {
    switch (event.type) {
      case 'update':
        this.updateStudent(event.item);
        break;
      case 'delete':
        this.deleteStudent(event.item);
    }
  }

  protected updateStudent(student: Student): void {
    this._store.dispatch(new ShowUpdateForm({ student }));
  }

  protected deleteStudent(student: Student): void {
    this._store.dispatch(new ConfirmDeleteStudents({ students: [student] }));
  }

}
