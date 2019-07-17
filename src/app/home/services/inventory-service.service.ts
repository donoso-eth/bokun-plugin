import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(
    public http: HttpClient,
  ) { }

 getPluginDefinition(): Observable<any>  {

    const username = 'BOKUN';
    const password = 'test-password';

    const url =
    'https://us-central1-madrid-day-spa.cloudfunctions.net/discountFunction';
    // const body = JSON.parse(JSON.stringify(promo));
    // url changed from this.introUrl
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
         Authorization: 'Basic ' + new Buffer(username + ':' + password).toString('base64')

      })
    };

    return this.http.post(url, body, httpOptions);
    // .map(this.extractData)
    // .catch(this.handleError);
  }
 }

}
