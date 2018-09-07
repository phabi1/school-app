import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AttendanceGridService } from '../../services/attendance-grid.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(
    private _attendanceGridService: AttendanceGridService,
    private store: Store<any>,
  ) { }

  ngOnInit() {
  }

  generate(): void {
    this._attendanceGridService.generate().subscribe(() => { });
  }

}
