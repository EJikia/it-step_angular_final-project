import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material.module';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { PostsComponent } from './posts/posts.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostDialogBoxComponent } from './posts/posts-list/post-dialog-box/post-dialog-box.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';
import { PostItemComponent } from './posts/posts-list/post-item/post-item.component';
import { RegistrationComponent } from './registration/registration.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner/loading-spinner.component';
import { FilterComponent } from './shared/filter/filter.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { CommentsComponent } from './comments/comments.component';
import { GroupsComponent } from './groups/groups.component';
import { GroupsListComponent } from './groups/groups-list/groups-list.component';
import { GroupDialogBoxComponent } from './groups/groups-list/group-dialog-box/group-dialog-box.component';
import { PageNotFoundComponent } from './shared/loading-spinner/loading-spinner/page-not-found.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { PostsService } from './services/posts.service';
import { SortComponent } from './shared/sort/sort.component';
import { GroupDetailComponent } from './groups/group-detail/group-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    PostsComponent,
    PostDetailComponent,
    PostDialogBoxComponent,
    PostsListComponent,
    PostItemComponent,
    RegistrationComponent,
    SettingsPageComponent,
    LoadingSpinnerComponent,
    FilterComponent,
    PostEditComponent,
    CommentsComponent,
    GroupsComponent,
    GroupsListComponent,
    GroupDialogBoxComponent,
    PageNotFoundComponent,
    SortComponent,
    GroupDetailComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,

  ],
  providers: [
    PostsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
