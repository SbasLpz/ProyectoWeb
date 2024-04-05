import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProveedor, IProveedorUpdate } from '../../interface/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  URL= 'http://localhost:8082/proveedor';
  httpOptions={
    headers:{
      'Content-Type':'application/json'
    }
  }
  constructor(private http:HttpClient) { }

  getProveedores():Observable<IProveedor[]>{
    return this.http.get<IProveedor[]>(this.URL+"es");
  }

  addProveedor(pro:IProveedorUpdate):Observable<IProveedor>{
    return this.http.post<IProveedor>(this.URL, pro, this.httpOptions);
  }
}
