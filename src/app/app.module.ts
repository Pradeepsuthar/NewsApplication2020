import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from '@angular/fire/storage';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TabsComponent } from './components/tabs/tabs.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { AccountComponent } from './pages/account/account.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { PostDataService } from './services/post-data.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ManageAppService } from './services/manage-app.service';
import { CommentBoxComponent } from './components/comment-box/comment-box.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { SingleUserListComponent } from './components/single-user-list/single-user-list.component';
import { FollowersListComponent } from './components/followers-list/followers-list.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { FollowingListComponent } from './components/following-list/following-list.component';
import { from } from 'rxjs';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    SigninComponent,
    ForgotPasswordComponent,
    TabsComponent,
    HomeComponent,
    UsersListComponent,
    AccountComponent,
    NotificationsComponent,
    CreatePostComponent,
    SettingsComponent,
    ToolbarComponent,
    CommentBoxComponent,
    SinglePostComponent,
    SingleUserListComponent,
    FollowersListComponent,
    EditProfileComponent,
    FollowingListComponent,
    AboutUsComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    Ng2SearchPipeModule
  ],
  providers: [
    PostDataService,
    ManageAppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
