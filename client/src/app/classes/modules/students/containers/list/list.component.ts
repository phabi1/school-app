import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StudentDataSource } from '../../data-sources/student.data-source';
import { LoadStudents } from '../../actions/student.actions';
import { MatDialog } from '@angular/material';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-students-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public dataSource: StudentDataSource;
  public displayedColumns: string[];

  constructor(
    private dialog: MatDialog,
    private store: Store<any>
  ) {
    this.dataSource = new StudentDataSource();
    this.displayedColumns = ['name', 'sex'];
  }

  ngOnInit() { }

  addStudent(): void {
    const dialogRef = this.dialog.open(AddComponent);
    dialogRef.afterClosed().pipe(

    );
  }

}
