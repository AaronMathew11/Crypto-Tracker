import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';
import { Observable } from 'rxjs';
import { Coin } from '../Models/Crypto';


@Injectable({
  providedIn: 'root'
})
export class ApiCallsService {

  baseUrl: string = environment.baseUrl;
  apiBaseUrl : string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public GetCardData() : Observable<any>
  {
    return this.http.get<Coin[]>(this.baseUrl+'/coins/markets?vs_currency=usd');
  }

  public GetCoinData(coinId : string) : Observable<any>
  {
    return this.http.get<any>(this.baseUrl+'/coins/'+coinId);
  }

  public GetPriceRange(coinId : string, t1:number , t2:number) : Observable<any>
  {
    return this.http.get<any>(this.baseUrl+'/coins/'+coinId+`/market_chart/range?vs_currency=usd&from=${t1}&to=${t2}`);
  }

  public AddToTaskList(data :any) : Observable<any>
  {
    let headers = new HttpHeaders({
      "Access-Control-Allow-Origin": "*"
    })
    return this.http.post(this.apiBaseUrl+'/addTrackingCoin',data,{
      headers
    });
  }

  public GetTaskList() : Observable<any>
  {
    return this.http.get<any>(this.baseUrl+'/getTrackingList');
  }

}
