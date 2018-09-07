import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ShowAddForm } from '../../actions/student.actions';
import { createStudent } from '../../models/student.model';

@Component({
  selector: 'app-classes-students-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private _store: Store<any>) { }

  ngOnInit() {
  }

  addStudent(): void {
    this._store.dispatch(new ShowAddForm({ student: createStudent() }));
  }


}
