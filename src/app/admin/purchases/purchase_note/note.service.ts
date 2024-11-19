import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

   // Reemplaza con tu endpoint GraphQL
   private baseUrl = environment.apiUrl;
   constructor(private http: HttpClient) {}
  
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }
  
  
  findAllNotes(limit: number, offset: number): Observable<any> {
    const query = `
      query {
        findAllNotes(limit: ${limit}, offset:${offset}) {
          items {
            id
            date
            type
            totalAmount
            storeId
            detailNotes {
              quantity
              price
              rawMaterialId
            }
          }
          total
        }
      }
    `;
    return this.http.post<any>(this.baseUrl, { query },{ headers: this.getHeaders() }).pipe(
      tap(response => console.log(response, "respuesta del server"))
      );
  }

  findNoteById(id: string): Observable<any> {
    const query = `
      query {
        findNoteById(id: "${id}") {
          id
          date
          type
          totalAmount
          storeId
          detailNotes {
            quantity
            price
            rawMaterialId
          }
        }
      }
    `;
    return this.http.post<any>(this.baseUrl, { query });
  }


   
  createNote(note: any): Observable<any> {
    const detailNotes = note.detailNotes.map((detail: any) => ({
      quantity: detail.quantity,
      price: detail.price,
      rawMaterialId: detail.rawMaterialId.id // Asegurarse de que sea una cadena
    }));
  
    const query = `
      mutation {
        createNote(
          date: "${note.date}", 
          type: "${note.type}", 
          totalAmount: ${note.totalAmount}, 
          detailNotes: ${JSON.stringify(detailNotes).replace(/"([^"]+)":/g, '$1:')}, 
          storeId: "${note.store.id}"
        ) {
          id
          date
          type
          totalAmount
          storeId
          detailNotes {
            quantity
            price
            rawMaterialId
          }
        }
      }
    `;
    console.log(query, "aver la query");
    return this.http.post<any>(this.baseUrl, { query }, { headers: this.getHeaders() });
  }
    /*
  updateNote(id: string, date: string, type: string, totalAmount: number, detailNotes: DetailNote[]): Observable<Note> {
    const mutation = `
      mutation {
        updateNote(id: "${id}", date: "${date}", type: "${type}", totalAmount: ${totalAmount}, detailNotes: ${JSON.stringify(detailNotes)}) {
          id
          date
          type
          totalAmount
          storeId
          detailNotes {
            quantity
            price
            rawMaterialId
          }
        }
      }
    `;
    return this.http.post<any>(this.baseUrl, { mutation });
  }
  */
  deleteNote(id: string): Observable<string> {
    const mutation = `
      mutation {
        deleteNote(id: "${id}")
      }
    `;
    return this.http.post<string>(this.baseUrl, { mutation },{ headers: this.getHeaders() });
  }
}
