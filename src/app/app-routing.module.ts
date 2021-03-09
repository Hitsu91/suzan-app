import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guard/admin.guard';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [] },
  {
    path: 'admin',
    loadChildren: () => import('./user/user.module').then((x) => x.UserModule),
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./admin/admin.module').then((x) => x.AdminModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
