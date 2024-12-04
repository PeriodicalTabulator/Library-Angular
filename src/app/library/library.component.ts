import { Component, inject } from '@angular/core';
import { BookComponent } from '../book/book.component';
import { CommonModule } from '@angular/common';
import { InsideBook } from '../inside-book';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TheLibraryService } from '../the-library.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule,BookComponent, FormsModule,HttpClientModule],
  templateUrl: './library.component.html',
  styleUrl: './library.component.css'
})




export class LibraryComponent {
  constructor(private router: Router, private libraryService: TheLibraryService)
   { this.bookComponentList = this.libraryService.BookComponentList;
    }

state:Number = 1;

bookComponentList: InsideBook[] = [];
ngOnInit():void{
this.libraryService.getBooks().subscribe((books:InsideBook[] | null)=>{
  if(books != null){
    this.state = 2;
  }else if (books == null){
    this.state = 3;
  }
});
}


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
      this.bookComponentList.push(this.newBook)
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