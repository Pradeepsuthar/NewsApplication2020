import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { AccountComponent } from './pages/account/account.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UserChatComponent } from './pages/user-chat/user-chat.component';


import { AuthGuardService } from 'src/app/services/auth-guard.service';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"signin",component:SigninComponent},
  {path:"signup",component:SignupComponent},
  {path:"forgot-password",component:ForgotPasswordComponent},
  {path:"users",component:UsersListComponent,canActivate:[AuthGuardService]},
  {path:"my-account",component:AccountComponent,canActivate:[AuthGuardService]},
  {path:"notifications",component:NotificationsComponent,canActivate:[AuthGuardService]},
  {path:"create-post",component:CreatePostComponent,canActivate:[AuthGuardService]},
  {path:"settings",component:SettingsComponent,canActivate:[AuthGuardService]},
  {path:"chat",component:UserChatComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
