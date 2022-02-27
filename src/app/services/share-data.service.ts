import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor() { }

  private subject = new BehaviorSubject<any>(false);

  sendData(data: any) {
    this.subject.next(data);
  }

  getData(): any {

    return this.subject.asObservable();
  }

}
