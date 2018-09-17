import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material';
import { BlocGroupComponent } from './components/bloc-group/bloc-group.component';
import { BlocComponent } from './components/bloc/bloc.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BlocTitleDirective } from './directives/bloc-title.directive';
import { BlocDescriptionDirective } from './directives/bloc-description.directive';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatDividerModule,
  ],
  exports: [
    BlocGroupComponent,
    BlocComponent,
    BlocTitleDirective,
    BlocDescriptionDirective
  ],
  declarations: [BlocGroupComponent, BlocComponent, BlocTitleDirective, BlocDescriptionDirective]
})
export class BlocsModule { }
