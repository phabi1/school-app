import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FirstnamePipe } from './firstname.pipe';
import { LastnamePipe } from './lastname.pipe';
import { SexPipe } from './sex.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SexPipe,
    FirstnamePipe,
    LastnamePipe
  ],
  declarations: [
    SexPipe,
    FirstnamePipe,
    LastnamePipe
  ]
})
export class PipesModule { }
