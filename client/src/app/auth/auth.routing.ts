import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: 'signin', loadChildren: './modules/signin/signin.module#SigninModule' },
  { path: 'signin', loadChildren: './modules/signout/signout.module#SignoutModule' },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
