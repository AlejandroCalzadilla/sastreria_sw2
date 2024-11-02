import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RawmaterialService {

  
  private apiUrl = 'http://localhost:8761/graphql'; // URL de tu API

  constructor(private http: HttpClient) { }
  // Cambia esto a la URL de tu servidor GraphQL

 
  findAllRawMaterials(): Observable<any> {
    const query = {
      query: `{
        findAllRawMaterials {
          id
          name
          unit
        }
      }`
    };
    return this.http.post<any>(this.apiUrl, query);
  }
  



}
