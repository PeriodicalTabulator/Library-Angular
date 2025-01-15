import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InsideBook } from '../inside-book';
import { TheLibraryService } from '../the-library.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [FormsModule, MatInputModule,ReactiveFormsModule],
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  bookForm!: FormGroup;
  bookComponentList: InsideBook[] = [];

  constructor(private libraryService: TheLibraryService, private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      id: [this.getNextId()],
      name: ['', [Validators.required, Validators.maxLength(80)]],
      photo: [''],
      nameAuthor: ['', Validators.required],
      obsah: ['', Validators.required],
      dostupnost: [false],
      dostupnostmnozstvo: [0, Validators.required],
    });
  }

   private getNextId(): number {
    return this.bookComponentList.length > 0 
    ? Math.max(...this.bookComponentList.map(book => +book.id)) + 1
      : 1;
  }
  ngOnInit(): void {
    this.libraryService.getBooks().subscribe((insideBook: InsideBook[]) => {
      this.bookComponentList = insideBook;
      console.log(this.bookComponentList);
    });
  }


 

  addBook(): void {
    if (this.bookForm.value.dostupnostmnozstvo > 0) {
      this.bookForm.patchValue({ dostupnost: true });
    } else {
      this.bookForm.patchValue({ dostupnost: false });
    }
  
    if (this.bookForm.valid) {
      const newBook = this.bookForm.value as InsideBook;
  
      this.libraryService.postBook(newBook).subscribe({
        next: (response: InsideBook) => {
          this.resetNewBook();
          console.log('PopUp New book:', response);
        },
        error: (error: any) => {
          console.error('Error adding book:', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
  
  resetNewBook(): void {
    this.bookForm.reset();
  }
    

}
