import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RawmaterialService {

  
  private apiUrl = environment.apiUrl; // URL de tu API


  constructor(private http: HttpClient) { }
  // Cambia esto a la URL de tu servidor GraphQL
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

 
  findAllRawMaterials(limit: number, offset: number): Observable<any> {
    const query = {
      query: `{
        findAllRawMaterials(limit: ${limit}, offset: ${offset}) {
        items{
          id
          name
          unit
        }total
        }
      }`
    };
    return this.http.post<any>(this.apiUrl, query, { headers: this.getHeaders() });
  }
  

  create(rawMaterial: any): Observable<any> {
    console.log("esta llegando al servicio");
    const query = {
      query: `mutation { createRawMaterial(name: "${rawMaterial.nombre}", unit: "${rawMaterial.unidad}") { id name unit } }`
    };
    return this.http.post<any>(this.apiUrl, query,{ headers: this.getHeaders() }).pipe(
      tap((response: any) => console.log('Respuesta del servidor:', response))
    );
  }



   edit(rawMaterial: any): Observable<any> { 
    console.log(rawMaterial, "del edit");
    const query = {
      query: `mutation {
        updateRawMaterial(id: "${rawMaterial.id}", name: "${rawMaterial.name}", unit: "${rawMaterial.unit}") {
          id
          name
          unit
        }
      }`
    };
    return this.http.post<any>(this.apiUrl, query,{ headers: this.getHeaders() });
  } 

  delete(id: string): Observable<any> {
    const query = {
      query: `mutation { deleteRawMaterial(id: "${id}") }`
    };
    return this.http.post<any>(this.apiUrl, query,{ headers: this.getHeaders() }).pipe(
      tap((response: any) => console.log('Respuesta del servidor:', response))
    );
  }




}
