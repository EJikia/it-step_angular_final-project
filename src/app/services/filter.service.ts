import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  filter(array: any, title: string) {
    if (typeof array !== 'undefined' && array.length > 0) {
      let filteredArray = [...array];
      if (title !== "") {
        filteredArray = filteredArray.filter(i => i.title.toLowerCase().includes(title.toLowerCase()));
        return filteredArray;
      }
      else {
        return array;
      }
    }
    return
  };

  newestToOldest(array: any) {
    if (typeof array !== 'undefined' && array.length > 0) {
      const sortedArray = array.sort((a: any, b: any) => (b.date) - (a.date))
      console.log(array, "new")
      console.log(sortedArray)
      return sortedArray
    } else {
      return
    }
  }
  oldestToNewest(array: any) {
    if (typeof array !== 'undefined' && array.length > 0) {
      const sortedArray = array.sort((a: any, b: any) => a.date - b.date)
      console.log(array, "old")
      console.log(sortedArray)
      return sortedArray
    } else {
      return
    }
  }
}
