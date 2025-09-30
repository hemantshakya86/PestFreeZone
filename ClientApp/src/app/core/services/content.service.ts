import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContentPageModel } from '../models/content-page.model';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private baseUrl = 'https://localhost:7288/content'; // Base URL for API

  constructor(private http: HttpClient) { }

  // Fetch all content pages
  getAllContentPages(): Observable<ContentPageModel[]> {
    return this.http.get<ContentPageModel[]>(`${this.baseUrl}`);
  }
  // Fetch all slides 
   getSlides(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/slides`);
  }
  // Fetch a single content page by ID
  getContentPageById(id: number): Observable<ContentPageModel> {
    return this.http.get<ContentPageModel>(`${this.baseUrl}/${id}`);
  }

  // Create a new content page
  createContentPage(content: ContentPageModel): Observable<ContentPageModel> {
    return this.http.post<ContentPageModel>(`${this.baseUrl}`, content);
  }

  // Update an existing content page
  updateContentPage(id: number, content: ContentPageModel): Observable<ContentPageModel> {
    return this.http.put<ContentPageModel>(`${this.baseUrl}/${id}`, content);
  }

  // Delete a content page by ID
  deleteContentPage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}