import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://dragonball-api.com/api';

  constructor(private http: HttpClient) {}

  // Dragon Ball Characters
  getCharacters(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get(`${this.baseUrl}/characters?page=${page}&limit=${limit}`);
  }

  // Get character by ID

  getCharacterById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/characters/${id}`);
  }

  // Dragon Ball Planets
  getPlanets(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get(`${this.baseUrl}/planets?page=${page}&limit=${limit}`);
  }

  // Get planet by ID
  
  getPlanetById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/planets/${id}`);
  }
}
