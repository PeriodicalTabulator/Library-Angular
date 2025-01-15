import { Injectable } from '@angular/core';
import { InsideBook } from './inside-book';
import { from, Observable, of } from 'rxjs';
import { delay, map,tap,catchError, switchMap} from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
  serviceBookList: InsideBook[] = [{
    "id": "0",
    "name": "FightClub",
    "photo": "https://cdn11.bigcommerce.com/s-gibnfyxosi/images/stencil/1280x1280/products/111890/113654/513PNeKaKrL__02114.1615558356.jpg?c=1",
    "nameAuthor": "we dont talk about fight club",
    "obsah": "first rule of fight club, never talk about fight club",
    "dostupnost": true,
    "dostupnostmnozstvo": 3
},
{
    "id": "1",
    "name": "About Mice and People",
    "photo": "https://th.bing.com/th/id/OIP.-8KH0RbN08qbOLuJbveIWQHaIp?rs=1&pid=ImgDetMain",
    "nameAuthor": "John Steibeck",
    "obsah": "friend kill a stupid friend gg",
    "dostupnost": true,
    "dostupnostmnozstvo": 1
},
{
    "id": "2",
    "name": "Neuromancer",
    "photo": "https://th.bing.com/th/id/OIP.eMV8yFKBLX2YVesCR7MZcQHaLT?rs=1&pid=ImgDetMain",
    "nameAuthor": "William Gibson",
    "obsah": "I steal your soul",
    "dostupnost": false,
    "dostupnostmnozstvo": 0
}];

  constructor(private http: HttpClient, private store: AngularFirestore) {
   // this.serviceBookList.forEach(data => (this.putAllData(data)))
  }
//get all books
  getBooks(): Observable<InsideBook[]> {
    return this.store.collection<InsideBook>('books').snapshotChanges().pipe(
      map(snapshot => 
        snapshot.map(doc => {
          const data = doc.payload.doc.data() as InsideBook;
          return {
            ...data,
            id: doc.payload.doc.id
          };
        })
      )
    );
  }
  

/*putAllData(data:InsideBook){
return this.store.collection('books').add(data);
}*/

deleteBook(bookId: string): Observable<void> {
  return from(this.store.collection('books').doc(bookId).delete()).pipe(
    catchError(error => {
      console.error('Error deleting book:', error);
      throw new Error('Failed to delete book');
    })
  );
}

  postBook(data: InsideBook): Observable<InsideBook> {
    return from(this.store.collection('books').add(data)).pipe(
      switchMap(docRef => docRef.get()),
      map(docSnapshot => {
        const data = docSnapshot.data() as InsideBook;
        return {
          ...data,
          id: docSnapshot.id
        };
      } ),
      catchError(error => {
        console.error('Error adding book:', error);
        return throwError(() => new Error('Failed to add book'));
      })
    );
  }
}
