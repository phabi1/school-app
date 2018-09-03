import { Component, Input, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-classes-students-student-item',
  templateUrl: './student-item.component.html',
  styleUrls: ['./student-item.component.scss']
})
export class StudentItemComponent implements OnInit {

  @Input()
  item: Student;

  get fullname() {
    return this.item.firstname + ' ' + this.item.lastname;
  }

  constructor() { }

  ngOnInit() {
  }

}
