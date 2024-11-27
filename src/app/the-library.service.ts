import { Injectable } from '@angular/core';
import { InsideBook } from './inside-book';
import { Observable, of,delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TheLibraryService {
  BookComponentList: InsideBook[] = [
    {
      "id": 0,
      "name": "FightClub",
      "photo" : "https://cdn11.bigcommerce.com/s-gibnfyxosi/images/stencil/1280x1280/products/111890/113654/513PNeKaKrL__02114.1615558356.jpg?c=1",
      "nameAuthor": "we dont talk about fight club",
      "obsah": "first rule of fight club, never talk about fight club",
      "dostupnost": true,
      "dostupnostmnozstvo": 3
    },
    {
      "id": 1,
      "name": "About Mice and People",
      "photo" : "https://th.bing.com/th/id/OIP.-8KH0RbN08qbOLuJbveIWQHaIp?rs=1&pid=ImgDetMain",
      "nameAuthor": "John Steibeck",
      "obsah": "friend kill a stupid friend gg",
      "dostupnost": true,
      "dostupnostmnozstvo": 1
    },
    {
      "id": 2,
      "name": "Neuromancer",
      "photo" : "https://th.bing.com/th/id/OIP.eMV8yFKBLX2YVesCR7MZcQHaLT?rs=1&pid=ImgDetMain",
      "nameAuthor": "William Gibson",
      "obsah": "I steal your soul",
      "dostupnost": false,
      "dostupnostmnozstvo": 0
    }
   ];
  constructor() { }
  getBooks():Observable<InsideBook[]>{
    return of (this.BookComponentList).pipe(delay(2000));
  }
}
