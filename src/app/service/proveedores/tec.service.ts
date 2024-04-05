import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITec, ITecUpdate } from '../../interface/tec';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TecService {
  URL= 'http://localhost:8082/tec';
  httpOptions={
    headers:{
      'Content-Type':'application/json'
    }
  }
  constructor(private http:HttpClient) { }

  getTec():Observable<ITec[]>{
    return this.http.get<ITec[]>(this.URL);
  }

  addTec(tec:ITecUpdate):Observable<ITec>{
    return this.http.post<ITec>(this.URL, tec, this.httpOptions);
  }
}
