import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReplaySubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  public formData = new ReplaySubject<any>();
  public host = 'madrid-day-spa.com';
  public path = 'bokun';
  public scheme = 'https';
  public apiEndPoint;
  username: string;
  password: string;
  constructor(
    public http: HttpClient,
  ) {
    this.apiEndPoint = `${this.scheme}://${this.host}/${this.path}`;
    this.username = 'admin';
    this.password = 'supersecret';
  }



 getPluginDefinition(): Observable<any>  {

    const url = this.apiEndPoint + '/plugin/definition';

    const body = {};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' +  btoa(this.username + ':' + this.password)

      })
    };

    return this.http.post(url, body, httpOptions);

  }

  getProductSearch(request: any): Observable<any>  {

    const url = this.apiEndPoint + '/product/search';

    const body = JSON.parse(JSON.stringify(request));

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' +  btoa(this.username + ':' + this.password)
      })
    };
    return this.http.post(url, body, httpOptions);
  }


  getProductById(request: any): Observable<any>  {

    const url = this.apiEndPoint + '/product/getById';

    const body = JSON.parse(JSON.stringify(request));

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' +  btoa(this.username + ':' + this.password)
      })
    };
    return this.http.post(url, body, httpOptions);
  }

 }


