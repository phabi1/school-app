import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-classes-students-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _dialog: MatDialog,
    private store: Store<any>
  ) { }

  ngOnInit() {
  }

  addStudent(): void {
    this._dialog.open(AddComponent);
  }

}
