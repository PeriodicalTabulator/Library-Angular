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
  idnumber =13 ;
  @Output() newItemEvent = new EventEmitter<string>();

veryNewBook:any;
  addNewItem(value: string) {
    if (value) {
      this.libraryService.emitNewItem(value);
      console.log('Child emitted:', value);
    }
  }

  constructor(private router: Router, private libraryService: TheLibraryService) {}

  ngOnInit(): void {
    this.libraryService.bookObject$.subscribe(newBook =>{
      this.veryNewBook = newBook;
      console.log("newBook came", newBook);
    })
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
}