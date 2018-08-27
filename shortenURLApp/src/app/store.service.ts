import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { Url } from './Models/UrlModel';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private tableFlagSource = new BehaviorSubject<boolean>(true);
  tableFlag = this.tableFlagSource.asObservable();

  // private UrlSource=new BehaviorSubject<Url[]>(null);
  private myURLsSource = new BehaviorSubject<Url[]>(null);
  urls = this.myURLsSource.asObservable();
  private myUpdatedURLsSource = new BehaviorSubject<Url[]>(null);
  updatedurls = this.myUpdatedURLsSource.asObservable();
  constructor() { }

  updateViewFlag(flag: boolean) {
    this.tableFlagSource.next(flag);
  }

  setURLs(myURLs: Url[]) {
    this.myURLsSource.next(myURLs);
  }

  setUpdatedUrls(updatedURLs: Url[]){
    this.myUpdatedURLsSource.next(updatedURLs);
  }
}


