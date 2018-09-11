import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './containers/signin/signin.component';
import { NotLoggedGuard } from 'ngrx-auth-store';

const routes: Routes = [
  { path: '', canActivate: [NotLoggedGuard], component: SigninComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SigninRoutingModule {}
