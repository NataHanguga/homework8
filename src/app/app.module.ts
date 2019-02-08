import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { TodoComponent } from './components/todo/todo.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MainComponent } from './components/main/main.component';
import { FilterPipe } from '../app/services/filter.pipe';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { SortingPipe } from './services/sorting.pipe';
import { AlwaysAuthGuard } from './services/always-auth.guard';
import { TodoService } from './services/todo.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    TodoComponent,
    UpdateUserComponent,
    MainComponent,
    FilterPipe,
    SortingPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MDBBootstrapModule,
    Ng2FilterPipeModule
  ],
  providers: [
    CookieService,
    AuthService,
    AlwaysAuthGuard,
    TodoService
  ],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
