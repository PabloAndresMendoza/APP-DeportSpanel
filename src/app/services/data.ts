import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private products$ = new BehaviorSubject<any[]>([]);

  private apiUrl = 'https://dmrrbmzxvrwlbxrfjbdf.supabase.co/rest/v1/product?select=*&order=id.asc';
  private apiUrlInsert = 'https://dmrrbmzxvrwlbxrfjbdf.supabase.co/rest/v1/product';
  private apiUrlId = 'https://dmrrbmzxvrwlbxrfjbdf.supabase.co/rest/v1/product?select=id'
  private apiUrlDeleted = 'https://dmrrbmzxvrwlbxrfjbdf.supabase.co/rest/v1/product';
  private apiBase = 'https://dmrrbmzxvrwlbxrfjbdf.supabase.co/rest/v1/product';

  private headers = new HttpHeaders({
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtcnJibXp4dnJ3bGJ4cmZqYmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNTk5MTIsImV4cCI6MjA3MzczNTkxMn0.4U6d84UBkGVn0yeUODayBBUP6PTcl7uwx4IY1Lguc2k',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtcnJibXp4dnJ3bGJ4cmZqYmRmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNTk5MTIsImV4cCI6MjA3MzczNTkxMn0.4U6d84UBkGVn0yeUODayBBUP6PTcl7uwx4IY1Lguc2k'
  });

  constructor(private http: HttpClient) {}

  loadProducts(): void {
    this.http.get<any[]>(this.apiUrl, { headers: this.headers })
      .subscribe({
        next: (data) => this.products$.next(data),
        error: (err) => console.error('Error al cargar productos:', err)
      });
  }

  getProducts(): Observable<any[]> {
    return this.products$.asObservable();
  }

  addProduct(product: any): Observable<any[]> {
    return this.http.post<any[]>(
      this.apiUrlInsert,
      product,
      { headers: this.headers.set('Prefer', 'return=representation') }
    );
  }

  deleteProduct(id: number): Observable<any> {
    const url = `${this.apiUrlDeleted}?id=eq.${id}`;
    return this.http.delete(url, { headers: this.headers });
  }

  getProductById(id: number) {
    const params = new HttpParams()
      .set('select', '*')      
      .set('id', `eq.${id}`);  

    return this.http.get<any[]>(this.apiBase, { headers: this.headers, params });
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.patch<any>(
      `${this.apiUrlDeleted}?id=eq.${id}`,
      product,
      { headers: this.headers }
    );
  }
}
