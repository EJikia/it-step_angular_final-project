import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostDialogBoxComponent } from './posts/posts-list/post-dialog-box/post-dialog-box.component';
import { PostsResolverService } from './posts/posts-resolver.service';
import { PostsComponent } from './posts/posts.component';
import { RegistrationComponent } from './registration/registration.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: "full" },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'update-user-info', component: SettingsPageComponent },
  {
    path: 'posts', component: PostsComponent,
    children: [
      { path: 'new', component: PostDialogBoxComponent },
      {
        path: ':id',
        component: PostDetailComponent,
        resolve: [PostsResolverService]
      },
      {
        path: ':id/edit',
        component: PostDialogBoxComponent,
        resolve: [PostsResolverService]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
