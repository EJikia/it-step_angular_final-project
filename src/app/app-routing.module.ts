import { registerLocaleData } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { GroupDetailComponent } from './groups/group-detail/group-detail.component';
import { GroupDialogBoxComponent } from './groups/groups-list/group-dialog-box/group-dialog-box.component';
import { GroupsComponent } from './groups/groups.component';
import { LoginComponent } from './login/login.component';
import { PostDetailComponent } from './posts/post-detail/post-detail.component';
import { PostDialogBoxComponent } from './posts/posts-list/post-dialog-box/post-dialog-box.component';
import { PostsResolverService } from './posts/posts-resolver.service';
import { PostsComponent } from './posts/posts.component';
import { RegistrationComponent } from './registration/registration.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { LoggedInGuard } from './shared/logged-in.guard';
import { PageNotFoundComponent } from './shared/page-not-found.component';


const routes: Routes = [
  { path: '', redirectTo: '/posts', pathMatch: "full" },
  { path: 'registration', component: RegistrationComponent, canActivate: [LoggedInGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard]},
  { path: 'groups', component: GroupsComponent,canActivate: [AuthGuard] },
  { path: 'groups/:id', component: GroupDetailComponent, canActivate: [AuthGuard]},
  { path: 'update-user-info', component: SettingsPageComponent, canActivate: [AuthGuard] },
  { path: 'posts', component: PostsComponent, canActivate: [AuthGuard]},
  { path: 'posts/:id', component: PostDetailComponent, resolve: {post: PostsResolverService}, canActivate: [AuthGuard] },
  { path: 'posts/:id/edit',  component: PostDialogBoxComponent,resolve: [PostsResolverService], canActivate: [AuthGuard]},
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
