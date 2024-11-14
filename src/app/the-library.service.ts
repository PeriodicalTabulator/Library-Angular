import { Injectable } from '@angular/core';
import { InsideBook } from './inside-book';

@Injectable({
  providedIn: 'root'
})
export class TheLibraryService {
  BookComponentList: InsideBook[] = [
    {
      "id": 0,
      "name": "FightClub",
      "photo" : "",
      "nameAuthor": "we dont talk about fight club",
      "obsah": "first rule of fight club, never talk about fight club",
      "dostupnost": true,
      "dostupnostmnozstvo": 3
    },
    {
      "id": 1,
      "name": "About Mice and People",
      "photo" : "",
      "nameAuthor": "John Steibeck",
      "obsah": "friend kill a stupid friend gg",
      "dostupnost": true,
      "dostupnostmnozstvo": 1
    },
    {
      "id": 2,
      "name": "Neuromancer",
      "photo" : "",
      "nameAuthor": "William Gibson",
      "obsah": "I steal your soul",
      "dostupnost": false,
      "dostupnostmnozstvo": 0
    }
   ];
  constructor() { }
}
