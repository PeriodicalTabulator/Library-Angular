import { Injectable } from '@angular/core';
import { InsideBook } from './inside-book';
import { Observable, of } from 'rxjs';
import { delay, map,tap,catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TheLibraryService {

  private newItemSource = new Subject<string>();
  newItem$ = this.newItemSource.asObservable();

  emitNewItem(item: string) {
    this.newItemSource.next(item);
  }




  private apiUrl = 'https://run.mocky.io/v3/8a368878-c4e3-4ac2-b04a-e2d29c5672dc'; 
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
