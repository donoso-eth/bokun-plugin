import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {

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
    this.username = 'admin0';
    this.password = 'suoersecret';
  }

 getPluginDefinition(): Observable<any>  {



    const url = this.apiEndPoint + '/plugin/definition';

    // const body = JSON.parse(JSON.stringify(promo));
    // url changed from this.introUrl

    const body = {};
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + new Buffer(this.username + ':' + this.password).toString('base64')

      })
    };

    return this.http.post(url, body, httpOptions);
    // .map(this.extractData)
    // .catch(this.handleError);
  }

  getProductSearch(request: any): Observable<any>  {



    const url = this.apiEndPoint + '/product/search';

    const body = JSON.parse(JSON.stringify(request));

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
         Authorization: 'Basic ' + new Buffer(this.username + ':' + this.password).toString('base64')
      })
    };
    return this.http.post(url, body, httpOptions);
  }

  getProductById(request: any): Observable<any>  {



    const url = this.apiEndPoint + '/product/getById';

    const body = JSON.parse(JSON.stringify(request));

    console.log(body);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
         Authorization: 'Basic ' + new Buffer(this.username + ':' + this.password).toString('base64')
      })
    };
    return this.http.post(url, body, httpOptions);
  }

 }


