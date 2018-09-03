import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { NotFoundRoutingModule } from './not-found.routing';

@NgModule({
  imports: [
    CommonModule,
    NotFoundRoutingModule
  ],
  declarations: [NotFoundComponent]
})
export class NotFoundModule { }
