import { Component, Input,Output,EventEmitter } from '@angular/core';
import { InsideBook } from '../inside-book';
import { TheLibraryService } from '../the-library.service';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [FormsModule,MatInputModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})



export class PopUpComponent {
  //define
  constructor(private libraryService: TheLibraryService,){}
  bookComponentList: InsideBook[] = [];
  
//auto id generator
  private getNextId(): number {
    return this.bookComponentList.length > 0 
      ? Math.max(...this.bookComponentList.map(book => book.id)) + 1 
      : 1;
  }

 //reset book after submit
 resetNewBook(): InsideBook {
  return {
    id: this.getNextId(),
    name: '',
    photo: '',
    nameAuthor: '',
    obsah: '',
    dostupnost: false,
    dostupnostmnozstvo: 0
  };
}

//call mocky for future push of books
   ngOnInit(): void {
    this.libraryService.getBooks().subscribe({
      next: (response: { insideBook: InsideBook[] }) => {
        console.log('PopUp API Response:', response);
          this.bookComponentList = response.insideBook;
        }})}

  //object for push
  newBook: InsideBook = {
    id: this.getNextId(),
    name: '',
    photo: '',
    nameAuthor: '',
    obsah: '',
    dostupnost: false,
    dostupnostmnozstvo: 0
  };

  //push method
  addBook():void {

    //dostupnost true or false
    if (this.newBook.dostupnostmnozstvo > 0) {
      this.newBook.dostupnost = true;
    } else {
      this.newBook.dostupnost = false;
    }

    // add new book to mocky
    this.libraryService.postBook(this.newBook).subscribe({
      next: (response: InsideBook) => {
        this.bookComponentList.push(response);
        //book property
        console.log('PopUp New book:', this.newBook);
        this.newBook = this.resetNewBook();
      },
      error: (error: any) => {
        console.error('Error adding book:', error);
      }
    });
  }
}
