import { Component, inject } from '@angular/core';
import { BookComponent } from '../book/book.component';
import { CommonModule } from '@angular/common';
import { InsideBook } from '../inside-book';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TheLibraryService } from '../the-library.service';
@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule,BookComponent, FormsModule,],
  template: `
<section>
<form>
<input  type="text" placeholder="Filter by name">
<button class="primary" type="button"> Search </button>
</form>
</section>
<section class="result">
<div><app-book *ngFor="let book of BookComponentList"  [books]="book"></app-book>
</div>
</section>

<form (ngSubmit)="addBook()">
    <input type="text" [(ngModel)]="newBook.name" name="name" placeholder="Name" required>
    <input type="text" [(ngModel)]="newBook.photo" name="photo" placeholder="photo-path">
    <input type="text" [(ngModel)]="newBook.nameAuthor" name="author" placeholder="author" required>
    <input type="text" [(ngModel)]="newBook.obsah" name="obsah" placeholder="Obsah" required>
    <input type="number" [(ngModel)]="newBook.dostupnostmnozstvo" name="mnozstvo" placeholder="mnozstvo-int" required>
    <button type="submit">Add Book</button>
  </form>
  `,
  styleUrl: './library.component.css'
})




export class LibraryComponent {
  //routing
  constructor(private router: Router, private libraryService: TheLibraryService)
   { this.BookComponentList = this.libraryService.BookComponentList;
    
    }

  BookComponentList: InsideBook[] = [];




   idnumber = 3;

   //new book properties
   newBook = {
    id: this.idnumber,
    name: '',
    photo: '',
    nameAuthor: '',
    obsah: '',
    dostupnost: false,
    dostupnostmnozstvo: 0,
  };
  

  //add book
  addBook() {
    if(this.newBook.dostupnostmnozstvo > 0){
      this.newBook.dostupnost=true;
    }else{
      this.newBook.dostupnost=false;
    }
      console.log('New book:', this.newBook);
      this.BookComponentList.push(this.newBook)
      this.idnumber = this.idnumber +1;
      this.newBook = {
        id: this.idnumber ,
        name: '',
        photo: '',
        nameAuthor: '',
        obsah: '',
        dostupnost: false,
        dostupnostmnozstvo: 0,
      }
          
    
  }
}