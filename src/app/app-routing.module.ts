import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { TodoComponent } from './components/todo/todo.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {path: 'main', component: MainComponent},
  {path: 'main/registration', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user/:name', component: UserComponent},
  {path: 'registration', component: RegisterComponent},
  {path: 'update/:name', component: UpdateUserComponent},
  {path: 'todo/:name', component: TodoComponent},
  {path: 'taskCard', component: TaskCardComponent},
  {path: '', pathMatch: 'full', redirectTo: 'main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
