import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { GroupsService } from '../services/groups.service';

@Injectable({
  providedIn: 'root'
})
export class GroupsResolverService {

  constructor(
    private groupsService: GroupsService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.groupsService.getGroup(route.params['id'])

  }
}
