import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  private apiUrl = 'http://localhost:5217/api/data/getAll';

  constructor(private http: HttpClient) { }

  executeQuery(query: string): Observable<any[]> {
    return this.http.post<any[]>(this.apiUrl, query);
  }
  
}
