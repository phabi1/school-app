import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrombinoscopeComponent } from './containers/trombinoscope/trombinoscope.component';

const routes: Routes = [
  { path: '', component: TrombinoscopeComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrombinoscopeRoutingModule {}
