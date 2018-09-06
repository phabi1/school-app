import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-classes-students-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  @Input()
  items: Student[];

  @Input()
  currentItem: Student;

  @Output() itemClicked = new EventEmitter<Student>();

  constructor() { }

  ngOnInit() {
  }

}
