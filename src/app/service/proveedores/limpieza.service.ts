import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILimpieza, ILimpiezaUpdate } from '../../interface/limpieza';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LimpiezaService {
  URL= 'http://localhost:8082/limpieza';
  httpOptions={
    headers:{
      'Content-Type':'application/json'
    }
  }
  constructor(private http:HttpClient) { }

  getLimpieza():Observable<ILimpieza[]>{
    return this.http.get<ILimpieza[]>(this.URL);
  }

  addLimpieza(limpieza:ILimpiezaUpdate):Observable<ILimpieza>{
    return this.http.post<ILimpieza>(this.URL, limpieza, this.httpOptions);
  }
}
