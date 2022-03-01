import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  filter(array: any, title: string) {
    if (typeof array !== 'undefined' && array.length > 0) {
      console.log(Array.isArray(array))
      let filteredArray = [...array];
      console.log(title.length)
      if (title.length > 0) {
        console.log(title)
        filteredArray = filteredArray.filter(i => i.title.toLowerCase().includes(title.toLowerCase()));
        console.log("shemovida tu carieli araashi", filteredArray)
        return filteredArray;

      }
      else {
        console.log("shemovida tu carieliashi", array)
        return array;
      }
    }
    return
  };

}
