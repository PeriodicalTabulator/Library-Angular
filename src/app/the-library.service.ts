import { Injectable } from '@angular/core';
import { InsideBook } from './inside-book';
import { Observable, of } from 'rxjs';
import { delay, map,tap,catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TheLibraryService {

  private apiUrl = 'https://run.mocky.io/v3/bda0a978-ecf5-41c8-a2d3-7bc41f155e4e'; 
  serviceBookList!: InsideBook[];

  constructor(private http: HttpClient) { }

  // Method to get books
  getBooks(): Observable<{ insideBook: InsideBook[] }> {
   console.log('Attempting to fetch books from URL:', this.apiUrl);
    return this.http.get<{ insideBook: InsideBook[] }>(this.apiUrl).pipe(
      tap(response => console.log('Raw API response:', response)),
      catchError(error => {
        console.error('HTTP Error:', error);
        return throwError(error);
      })
    );
  }

  // Method to post book
  postBook(book: InsideBook): Observable<InsideBook> { 
     return this.http.post<InsideBook>(this.apiUrl, book); }
}
