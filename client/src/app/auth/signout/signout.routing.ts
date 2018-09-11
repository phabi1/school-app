import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignoutComponent } from './containers/signout/signout.component';
import { IsLoggedGuard } from 'ngrx-auth-store';

const routes: Routes = [
  { path: '', canActivate: [IsLoggedGuard], component: SignoutComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignoutRoutingModule {}
