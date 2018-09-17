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
  displayName: string;

  @Input()
  selected: boolean;

  @Output() selectedChange = new EventEmitter<void>();

  constructor() {
    this.displayName = 'firstname_lastname';
  }

  onSelectChange(): void {
    this.selectedChange.emit();
  }

}
