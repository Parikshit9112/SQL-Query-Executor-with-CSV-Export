import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  private apiUrl = 'http://localhost:5217/api/data/getAll'; // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  executeQuery(query: string, page: number, size: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
      // .set('search', searchQuery);
    return this.http.post<any>(this.apiUrl, query, { params });
  }
}
