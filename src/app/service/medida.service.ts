import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMedida } from '../interface/medida'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MedidaService {
  URL= 'http://localhost:8082/medidas';
  httpOptions={
    headers:{
      'Content-Type':'application/json'
    }
  }
  constructor(private http:HttpClient) { }

  getMedidas():Observable<IMedida[]>{
    return this.http.get<IMedida[]>(this.URL);
  }

}
