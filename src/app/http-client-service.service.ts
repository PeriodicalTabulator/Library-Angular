import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InsideBook } from './inside-book';

@Injectable({
  providedIn: 'root'
})
export class TheLibraryService {

  // Use your Mocky URL here
  private apiUrl = 'https://run.mocky.io/v3/2c749c80-4095-4744-860d-324b5113cdc4'; 

  constructor(private http: HttpClient) { }

  // Method to get books
  getBooks(): Observable<{ insideBook: InsideBook[] }> {
    return this.http.get<{ insideBook: InsideBook[] }>(this.apiUrl);
  }

  // Method to post book
  postBook(book: InsideBook): Observable<InsideBook> {
    return this.http.post<InsideBook>(this.apiUrl, book);
  }
}


  
