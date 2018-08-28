import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatListModule } from '@angular/material';
import { ListComponent } from './containers/list/list.component';
import { ToolsService } from './services/tools.service';
import { ToolsRoutingModule } from './tools.routing';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    ToolsRoutingModule
  ],
  declarations: [ListComponent],
  providers: [
    ToolsService,
  ]
})
export class ToolsModule { }
