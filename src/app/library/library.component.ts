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


  constructor(private router: Router, private libraryService: TheLibraryService) {}

  ngOnInit(): void {
    this.libraryService.getBooks().subscribe((insideBook: InsideBook[]) => {
      this.bookComponentList = insideBook;
      console.log("before if",this.bookComponentList);
      if(insideBook != null){
        this.state = 2;
        this.bookComponentList = insideBook;
        console.log("after if",this.bookComponentList);
      }else{
        this.state = 3;
      }
    });

  }
}