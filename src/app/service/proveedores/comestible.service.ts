import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IComestible, IComestibleUpdate } from '../../interface/comestible'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComestibleService {
  URL= 'http://localhost:8082/comestible';
  httpOptions={
    headers:{
      'Content-Type':'application/json'
    }
  }
  constructor(private http:HttpClient) { }

  getComestibles():Observable<IComestible[]>{
    return this.http.get<IComestible[]>(this.URL);
  }

  addComestible(profesor:IComestibleUpdate):Observable<IComestible>{
    return this.http.post<IComestible>(this.URL, profesor, this.httpOptions);
  }
}
