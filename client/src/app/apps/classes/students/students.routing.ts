import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './containers/app/app.component';
import { ResolveGuard } from './guards/resolve.guard';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [ResolveGuard]
  },
  {
    path: ':studentId',
    component: AppComponent,
    canActivate: [ResolveGuard]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
