import { Component, EventEmitter, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsideBook } from '../inside-book';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TheLibraryService } from '../the-library.service';
import { BookComponent } from '../book/book.component';
import { HttpClientModule } from '@angular/common/http';
import { Output } from '@angular/core';
@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, BookComponent, FormsModule, HttpClientModule],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  state: number = 1;
  bookComponentList: InsideBook[] = [];
  idnumber = 3;

  @Output() dataEvent = new EventEmitter<any>();

  sendDataParent(){
    const data = {message: 'Hello World!'};
    this.dataEvent.emit(data);
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

  constructor(private router: Router, private libraryService: TheLibraryService) {}

  ngOnInit(): void {
    this.libraryService.getBooks().subscribe({
      next: (response: { insideBook: InsideBook[] }) => {
        console.log('API Response:', response); // Debug log

        if (response && response.insideBook && response.insideBook.length > 0) {
          this.bookComponentList = response.insideBook;
          this.state = 2;
        } else {
          console.log('No books found'); // Debug log
          console.log('Response details:', {
            hasResponse: !!response,
            insideBookExists: response?.insideBook !== undefined,
            insideBookLength: response?.insideBook?.length
          });

          this.state = 3;

        }
      },
      error: (error: any) => {
        console.error('fetch detail error:', error);
        console.log('Error details:', {
          message: error.message,
          status: error.status,
          statusText: error.statusText
        });
        this.state = 3;
      }
    });
  }

  addBook(): void {
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