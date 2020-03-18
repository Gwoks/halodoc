import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HackernewsService {

  private endpoint = "https://hn.algolia.com/api/v1/";

  constructor(private httpClient: HttpClient) { }

  public getQuery(q: string) {
    return this.httpClient.get(this.endpoint + 'search?query=' + q);
  }

  public getAuthor(a: string) {
    return this.httpClient.get(this.endpoint + 'users/' + a);
  }
}
