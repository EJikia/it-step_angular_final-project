import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/post';
import { Comment } from '../models/comment';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import * as alertyfy from 'alertifyjs';
import { Group } from '../models/group';
@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  getGroupsURL = "http://localhost:3000/groups?_expand=user"
  groupsURL = "http://localhost:3000/groups"
  constructor(private authService: AuthService, private http: HttpClient) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.getGroupsURL)
  }

  addGroup(group: Group) {
    group.userId = this.authService.userId;
    group.members=[];

    return this.http.post(this.groupsURL, group).subscribe(res => {
      alertyfy.success('successfully added');
    });
  }

  deleteGroup(id: number) {
    return this.http.delete(`${this.groupsURL}/${id}`).subscribe(res => {
      alertyfy.success('successfully deleted');
    });
  }

  updateGroup(group: Group) {
    return this.http.patch(`${this.groupsURL}/${group.id}`, group).subscribe(data => {
    })

  }
  getGroup(id: number) {
    return this.http.get<Post>(`${this.groupsURL}/${id}?_expand=user`)
  }
}
