import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDesechable, IDesechableUpdate } from '../../interface/desechable';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesechableService {
  URL= 'http://localhost:8082/desechable';
  httpOptions={
    headers:{
      'Content-Type':'application/json'
    }
  }
  constructor(private http:HttpClient) { }

  getDesechables():Observable<IDesechable[]>{
    return this.http.get<IDesechable[]>(this.URL);
  }

  addDesechable(des:IDesechableUpdate):Observable<IDesechable>{
    return this.http.post<IDesechable>(this.URL, des, this.httpOptions);
  }
}
