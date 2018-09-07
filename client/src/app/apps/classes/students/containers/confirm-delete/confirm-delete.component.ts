import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { DeleteStudents } from '../../actions/student.actions';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-classes-students-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { students: Student[] },
    private _dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    private _store: Store<any>
  ) { }

  delete(): void {
    const ids = this.data.students.map((student) => student.id);
    this._store.dispatch(new DeleteStudents({ ids }));
    this._dialogRef.close();
  }

}
