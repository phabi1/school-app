import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormComponent } from './containers/form/form.component';
import { ResolveGuard } from './guards/resolve.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [ResolveGuard],
    component: FormComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FirstnameLabelRoutingModule { }
