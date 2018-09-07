import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
  MatSelectModule,
  MatRippleModule,
  MatDatepickerModule,
  MatCheckboxModule,
} from '@angular/material';
import { FuseSidebarModule } from '@fuse/components';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
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
import { GradeEffects } from './effects/grade.effects';
import { StudentPicturePickerComponent } from './components/student-picture-picker/student-picture-picker.component';
import { NgxUploaderModule } from 'ngx-uploader';
import { StudentPictureModule } from '../../../ui/student-picture/student-picture.module';
import { ConfirmDeleteComponent } from './containers/confirm-delete/confirm-delete.component';
import { SidebarComponent } from './containers/sidebar/sidebar.component';

export function translateLoaderFactory(httpClient: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(httpClient, '/assets/i18/classes-students/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    // TranslateModule.forChild({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: translateLoaderFactory,
    //     deps: [HttpClient]
    //   }
    // }),
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
    MatRippleModule,
    MatDatepickerModule,
    MatCheckboxModule,
    StudentsRoutingModule,
    FuseSidebarModule,
    StudentPictureModule,
    StoreModule.forFeature('students', reducers),
    EffectsModule.forFeature([StudentsEffects, GradeEffects]),
    NgxUploaderModule,
  ],
  entryComponents: [
    AddComponent,
    UpdateComponent,
    ConfirmDeleteComponent
  ],
  declarations: [
    ListComponent,
    AddComponent,
    AppComponent,
    DetailsComponent,
    StudentListComponent,
    StudentItemComponent,
    StudentDetailComponent,
    UpdateComponent,
    StudentPicturePickerComponent,
    ConfirmDeleteComponent,
    SidebarComponent
  ],
  providers: [
    ResolveGuard,
    StudentsService
  ]
})
export class StudentsModule {
  constructor(
    private _translateService: TranslateService,
  ) {
    // this._translateService.use('fr');
  }
}
