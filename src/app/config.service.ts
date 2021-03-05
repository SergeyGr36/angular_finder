import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DataFromServer} from "./data.from.server";
import {javaConnector} from "./config/env.json";



@Injectable({providedIn: 'root'})
export class ConfigService {
  private url: string = 'http://' + javaConnector + '/api/finder';

  constructor(private http: HttpClient) {
  }

  getData(input: string): Observable<DataFromServer[]> {
    return this.http.post<DataFromServer[]>(this.url + "/find", input);
  }

  deleteData(dataFromRow: DataFromServer): Observable<boolean> {
    const options = {
      body: dataFromRow
    }
    // @ts-ignore
    return this.http.delete<boolean>(this.url, options); //todo remove suppress warnings
  }

  createData(input: string): Observable<DataFromServer> {
    return this.http.post<DataFromServer>(this.url + "/create", input);
  }

  updateData(value: DataFromServer): Observable<any> {
    return this.http.put(this.url + "/edit", value)
  }
}
