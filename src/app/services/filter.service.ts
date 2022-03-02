import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  filter(array: any, title: string) {
    if (typeof array !== 'undefined' && array.length > 0) {
      let filteredArray = [...array];
      if (title.length > 0) {
        filteredArray = filteredArray.filter(i => i.title.toLowerCase().includes(title.toLowerCase()));
         return filteredArray;

      }
      else {
        return array;
      }
    }
    return
  };

}
