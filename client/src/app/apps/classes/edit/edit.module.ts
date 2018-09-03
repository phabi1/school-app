import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EditComponent } from './containers/edit/edit.component';
import { EditRoutingModule } from './edit.routing';

@NgModule({
  imports: [
    CommonModule,
    EditRoutingModule
  ],
  declarations: [EditComponent]
})
export class EditModule { }
