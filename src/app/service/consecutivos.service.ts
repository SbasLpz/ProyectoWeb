import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IConsecutivos } from '../interface/consecutivos'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConsecutivosService {
  URL= 'http://localhost:8082/consecutivos';
  httpOptions={
    headers:{
      'Content-Type':'application/json'
    }
  }
  constructor(private http:HttpClient) { }

  getConsecutivos():Observable<IConsecutivos[]>{
    return this.http.get<IConsecutivos[]>(this.URL);
  }
}
