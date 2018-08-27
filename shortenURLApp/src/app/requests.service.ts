import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {Url} from './Models/UrlModel'
import {RootObject} from './Models/DetailModel'
import {Click_Stat_Model} from './Models/StatModel'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  
  constructor(private http:HttpClient) { }
  shortenURL(url) : Observable<Url[]>{
    return this.http.post<Url[]>('http://localhost:8080/qrapi/api/v1/url/add', url);
  }

  getURLs() : Observable<Url[]>{
    return this.http.get<Url[]>('http://localhost:8080/qrapi/api/v1/url/get/all');
  }

  getUrlStats(id):Observable<Click_Stat_Model[]>{
    return this.http.get<Click_Stat_Model[]>('http://localhost:8080/qrapi/api/v1/url/get/stats?urlID='+id);
  }

  getUrlDetails(id):Observable<RootObject[]>{
    return this.http.get<RootObject[]>('http://localhost:8080/qrapi/api/v1/url/details?urlID='+id);
  }

}
