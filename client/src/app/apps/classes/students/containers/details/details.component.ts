import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Student } from '../../models/student.model';
import { getCurrentStudent } from '../../selectors/student.selectors';
import { MatDialog } from '@angular/material';
import { UpdateComponent } from '../update/update.component';

@Component({
  selector: 'app-classes-students-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit {

  public currentStudent$: Observable<Student>;

  constructor(
    private _dialog: MatDialog,
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
    const dialogRef = this._dialog.open(UpdateComponent, { data: { student } });
  }

  protected deleteStudent(student: Student): void {

  }

}
