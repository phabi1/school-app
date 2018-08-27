import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './containers/home/home.component';
import { IsLoggedGuard } from 'ngrx-auth-store';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [IsLoggedGuard] }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {}
