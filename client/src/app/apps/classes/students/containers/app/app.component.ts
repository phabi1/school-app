import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store } from '@ngrx/store';
import { AddComponent } from '../add/add.component';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SetSearchText } from '../../actions/student.actions';

@Component({
  selector: 'app-classes-students-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public searchInput: FormControl;

  constructor(
    private _dialog: MatDialog,
    private _store: Store<any>
  ) {
    this.searchInput = new FormControl();

    this.searchInput.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchText => {
      this._store.dispatch(new SetSearchText(searchText));
    });
  }

  ngOnInit() {
  }

  addStudent(): void {
    this._dialog.open(AddComponent);
  }

  toggleSidebar(name: string): void { }

}
