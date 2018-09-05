import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentPictureComponent } from './student-picture.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    StudentPictureComponent,
  ],
  declarations: [StudentPictureComponent]
})
export class StudentPictureModule { }
