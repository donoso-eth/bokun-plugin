import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,  ReplaySubject } from 'rxjs';
import {  PluginConfigurationParameterValue } from 'src/app/models/bokun-types';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  public parameters: Array<PluginConfigurationParameterValue>;
  public formData = new ReplaySubject<any>();
  public apiEndPoint;
  username: string;
  password: string;
  constructor(
    public http: HttpClient,
  ) {
    // this.apiEndPoint = ``//${this.scheme}://${this.host}/${this.path}`;
    // this.username = 'admin';
    // this.password = 'supersecret';

    this.formData.subscribe(result => {
      this.apiEndPoint =
      `${result.pluginDefinitionGroup.scheme}://${result.pluginDefinitionGroup.host}/${result.pluginDefinitionGroup.path}`;
      this.username = result.pluginDefinitionGroup.username;
      this.password = result.pluginDefinitionGroup.password;
      console.log(this.apiEndPoint);

      this.parameters = Object.keys(result.pluginDefinitionGroup)
      .map(key => ({ name: key, value: result.pluginDefinitionGroup[key]}));


    });


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

    return this.http.get(url,  httpOptions);

  }

  getProductSearch(request: any): Observable<any>  {
    console.log(request);
    const url = this.apiEndPoint + '/product/search';
    request.parameters = this.parameters;
    const body = JSON.parse(JSON.stringify(request));
    console.log(request);
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


