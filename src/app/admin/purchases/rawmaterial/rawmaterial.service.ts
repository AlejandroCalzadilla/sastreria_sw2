import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RawmaterialService {

  
  private apiUrl = 'http://localhost:8761/graphql/raw-material'; // URL de tu API

  constructor(private http: HttpClient) { }
  // Cambia esto a la URL de tu servidor GraphQL

 
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
    return this.http.post<any>(this.apiUrl, query);
  }
  

  create(rawMaterial: any): Observable<any> {
    console.log("esta llegando al servicio");
    const query = {
      query: `mutation { createRawMaterial(name: "${rawMaterial.nombre}", unit: "${rawMaterial.unidad}") { id name unit } }`
    };
    return this.http.post<any>(this.apiUrl, query).pipe(
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
    return this.http.post<any>(this.apiUrl, query);
  } 

  delete(id: string): Observable<any> {
    const query = {
      query: `mutation { deleteRawMaterial(id: "${id}") }`
    };
    return this.http.post<any>(this.apiUrl, query).pipe(
      tap((response: any) => console.log('Respuesta del servidor:', response))
    );
  }




}
