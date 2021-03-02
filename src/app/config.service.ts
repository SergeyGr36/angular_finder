import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataFromServer} from "./data.from.server";

@Injectable({providedIn: 'root'})
export class ConfigService {
  private url: string = 'http://localhost:8080/api/finder/find';

  constructor(private http: HttpClient) {
  }

  getData(input: string): Observable<DataFromServer[]> {
    return this.http.post<DataFromServer[]>(this.url, input);
  }
}
