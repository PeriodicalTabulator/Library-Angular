import { Component, Input } from '@angular/core';
import { InsideBook } from '../inside-book';
import { MatSlideToggleModule, } from '@angular/material/slide-toggle'; 
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { trigger, state, style, animate, transition } from '@angular/animations'
import { TheLibraryService } from '../the-library.service';


@Component({
  selector: 'app-book',
  standalone: true,
  imports: [MatSlideToggleModule, MatButtonModule, MatCardModule, MatBadgeModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
 animations: [ trigger('slide',[
   state('open', style({ height: '*', opacity: 1, display: 'block' })), 
    state('closed', style({ height: '0px', opacity: 0, display: 'none' })),
     transition('open <=> closed', [ animate('300ms ease-in-out') ]) ]),
      trigger('rotate', [ state('start', style({ transform: 'rotate(0deg)' })),
         state('end', style({ transform: 'rotate(540deg)' })),
          transition('start <=> end',
             [ animate('500ms ease-in-out') ]) ])]
  
})
export class BookComponent {

  @Input() books!:InsideBook;
  nomoreundo: boolean = true;
  nomore:boolean = false;
  undoAmount:number = 0;
  isOpen = false;
  toggle() { this.isOpen = !this.isOpen; 
  }
constructor(private libraryService: TheLibraryService){}
  reserveBook(){
    if(this.books.dostupnostmnozstvo > 0)
    {
      this.nomoreundo=false;
      this.books.dostupnostmnozstvo = this.books.dostupnostmnozstvo - 1;
      this.undoAmount = this.undoAmount + 1;
      console.log("undo" ,this.undoAmount);
      console.log("dostupnost" ,this.books.dostupnostmnozstvo);
        if(this.books.dostupnostmnozstvo == 0)
          {
            console.log('no more books');
            this.nomore=true;
          }
    }
    else{
          this.nomore = true;
        }
  
  }
  
  undoBook(){
    if(this.undoAmount > 0){
      this.nomoreundo=false;
      this.nomore = false;
      this.books.dostupnostmnozstvo = this.books.dostupnostmnozstvo + 1
      this.undoAmount = this.undoAmount - 1;
      console.log("undo" ,this.undoAmount);
      console.log("dostupnost" ,this.books.dostupnostmnozstvo);
    }
    if(this.undoAmount == 0){
      this.nomoreundo = true
      this.undoAmount = 0;
     }
     
  }
  deleteBook(){
        this.libraryService.deleteBook(this.books.id).subscribe({
          next: () => {
            console.log('Book deleted successfully');
         alert("Book deleted");
          }
        });
      }
    }
  