import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatDialogModule, MatTableModule, MatInputModule, MatFormFieldModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { AddComponent } from './containers/add/add.component';
import { ListComponent } from './containers/list/list.component';
import * as fromStudent from './reducers/student.reducer';
import { StudentsRoutingModule } from './students.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    StudentsRoutingModule,
    StoreModule.forFeature('student', fromStudent.reducer)
  ],
  entryComponents: [
    AddComponent
  ],
  declarations: [ListComponent, AddComponent]
})
export class StudentsModule { }
