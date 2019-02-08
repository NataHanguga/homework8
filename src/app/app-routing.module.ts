import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { TodoComponent } from './components/todo/todo.component';
import { MainComponent } from './components/main/main.component';
import { AlwaysAuthGuard } from './services/always-auth.guard';

const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'main/registration', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user/:id', component: UserComponent, canActivate: [AlwaysAuthGuard]},
  {path: 'registration', component: RegisterComponent},
  {path: 'update/:name', component: UpdateUserComponent},
  {path: 'todo/:id', component: TodoComponent, canActivate: [AlwaysAuthGuard]},
  {path: '', pathMatch: 'full', redirectTo: 'main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
