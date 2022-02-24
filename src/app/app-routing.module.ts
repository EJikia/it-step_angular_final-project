import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostDialogBoxComponent } from './posts/posts-list/post-dialog-box/post-dialog-box.component';
import { PostsResolverService } from './posts/posts-resolver.service';
import { PostsComponent } from './posts/posts.component';
import { RegistrationComponent } from './registration/registration.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { PageNotFoundComponent } from './shared/loading-spinner/loading-spinner/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: "full" },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'update-user-info', component: SettingsPageComponent, canActivate: [AuthGuard] },
  {
    path: 'posts', component: PostsComponent, canActivate: [AuthGuard],
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
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
