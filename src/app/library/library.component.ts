import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsideBook } from '../inside-book';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TheLibraryService } from '../the-library.service';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, BookComponent, FormsModule],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {
  state: number = 1;
  bookComponentList: InsideBook[] = [];
  idnumber = 3;

  newBook: InsideBook = {
    id: this.idnumber,
    name: '',
    photo: '',
    nameAuthor: '',
    obsah: '',
    dostupnost: false,
    dostupnostmnozstvo: 0
  };

  constructor(private router: Router, private libraryService: TheLibraryService) {
    this.bookComponentList = this.libraryService.BookComponentList;
  }

  ngOnInit(): void {
    this.libraryService.getBooks().subscribe({
      next: (response) => {
        if (response) {
          this.bookComponentList = response;
          this.bookComponentList = response;
          this.state = 2;
        } else {
          this.state = 3;
        }
      },
      error: (error) => {
        console.error('Error fetching books:', error);
        this.state = 3;
      }
    });
  }

  addBook(): void {
    if (this.newBook.dostupnostmnozstvo > 0) {
      this.newBook.dostupnost = true;
    } else {
      this.newBook.dostupnost = false;
    }
    console.log('New book:', this.newBook);
    this.bookComponentList.push(this.newBook);
    this.idnumber = this.idnumber + 1;
    this.newBook = {
      id: this.idnumber,
      name: '',
      photo: '',
      nameAuthor: '',
      obsah: '',
      dostupnost: false,
      dostupnostmnozstvo: 0
    };
  }
}
