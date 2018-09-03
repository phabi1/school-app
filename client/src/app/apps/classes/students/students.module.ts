import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatListModule,
  MatIconModule,
  MatMenuModule,
  MatRadioModule,
  MatSelectModule
} from '@angular/material';
import { FuseSidebarModule } from '@fuse/components';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AddComponent } from './containers/add/add.component';
import { AppComponent } from './containers/app/app.component';
import { DetailsComponent } from './containers/details/details.component';
import { ListComponent } from './containers/list/list.component';
import { StudentsEffects } from './effects/students.effects';
import { ResolveGuard } from './guards/resolve.guard';
import { reducers } from './reducers';
import { StudentsService } from './services/students.service';
import { StudentsRoutingModule } from './students.routing';
import { StudentListComponent } from './components/student-list/student-list.component';
import { StudentItemComponent } from './components/student-item/student-item.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';
import { UpdateComponent } from './containers/update/update.component';
import { LevelEffects } from './effects/level.effects';

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
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    MatSelectModule,
    StudentsRoutingModule,
    FuseSidebarModule,
    StoreModule.forFeature('students', reducers),
    EffectsModule.forFeature([StudentsEffects, LevelEffects]),
  ],
  entryComponents: [
    AddComponent,
    UpdateComponent,
  ],
  declarations: [
    ListComponent,
    AddComponent,
    AppComponent,
    DetailsComponent,
    StudentListComponent,
    StudentItemComponent,
    StudentDetailComponent,
    UpdateComponent
  ],
  providers: [
    ResolveGuard,
    StudentsService
  ]
})
export class StudentsModule { }
