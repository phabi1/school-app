import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FirstnamePipe } from './firstname.pipe';
import { LastnamePipe } from './lastname.pipe';
import { SexPipe } from './sex.pipe';
import { FullnamePipe } from './fullname.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    SexPipe,
    FirstnamePipe,
    LastnamePipe,
    FullnamePipe
  ],
  declarations: [
    SexPipe,
    FirstnamePipe,
    LastnamePipe,
    FullnamePipe
  ]
})
export class PipesModule { }
