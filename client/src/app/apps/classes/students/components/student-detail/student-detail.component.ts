import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-classes-students-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss']
})
export class StudentDetailComponent implements OnInit {

  @Input()
  student: Student;

  @Output() action = new EventEmitter<{ action: string, item: Student }>();

  get fullname() {
    return this.student.firstname + ' ' + this.student.lastname;
  }

  constructor() { }

  ngOnInit() {
  }

}
