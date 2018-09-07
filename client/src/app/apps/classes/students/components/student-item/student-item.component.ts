import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-classes-students-student-item',
  templateUrl: './student-item.component.html',
  styleUrls: ['./student-item.component.scss']
})
export class StudentItemComponent {

  @Input()
  item: Student;

  @Input()
  selected: boolean;

  @Output() selectedChange = new EventEmitter<void>();

  get fullname() {
    return this.item.firstname + ' ' + this.item.lastname;
  }

  constructor() { }

  onSelectChange(): void {
    this.selectedChange.emit();
  }

}
