import { Component, Input,Output,EventEmitter } from '@angular/core';
import { InsideBook } from '../inside-book';
import { TheLibraryService } from '../the-library.service';
import { FormsModule} from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatOption, MatSelect } from '@angular/material/select';
@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [FormsModule,MatFormField,MatSelect,MatOption],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.css'
})
export class PopUpComponent {
  constructor(private libraryService: TheLibraryService){}
idnumber = 13;
   bookComponentList: InsideBook[] = [];

   ngOnInit(): void {
    this.libraryService.getBooks().subscribe({
      next: (response: { insideBook: InsideBook[] }) => {
        console.log('API Response:', response);
          this.bookComponentList = response.insideBook;
        }})}
      
@Output() newBookEvent = new EventEmitter<any>();

addNewBook(newBook:object){
  this.libraryService.emitNewBook(newBook);
}
 
  newBook: InsideBook = {
    id: this.idnumber,
    name: '',
    photo: '',
    nameAuthor: '',
    obsah: '',
    dostupnost: false,
    dostupnostmnozstvo: 0
  };

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
        this.idnumber += 1;
        this.newBook = {
          id: this.idnumber,
          name: '',
          photo: '',
          nameAuthor: '',
          obsah: '',
          dostupnost: false,
          dostupnostmnozstvo: 0
        };
        //book property
        console.log('New book:', this.newBook);
      },
      error: (error: any) => {
        console.error('Error adding book:', error);
      }
    });
  }
}
