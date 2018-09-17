import { Component, OnInit, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { Student } from '../../models/student.model';

@Component({
  selector: 'app-classes-students-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentListComponent implements OnInit {

  @Input()
  selectedItems: Student[];

  @Input()
  items: Student[];

  @Input()
  currentItem: Student;

  @Input()
  displayName: string;

  @Output() itemClicked = new EventEmitter<Student>();

  @Output() itemSelected = new EventEmitter<Student>();

  constructor() { }

  ngOnInit() {
  }

  isSelected(item: Student): boolean {
    for (const selectedItem of this.selectedItems) {
      if (selectedItem.id === item.id) {
        return true;
      }
    }
    return false;
  }

}
