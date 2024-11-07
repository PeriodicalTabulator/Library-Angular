import { Component, Input } from '@angular/core';
import { InsideBook } from '../inside-book';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule, } from '@angular/material/slide-toggle'; 
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import { arrRemove } from 'rxjs/internal/util/arrRemove';
@Component({
  selector: 'app-book',
  standalone: true,
  imports: [MatSlideToggleModule, MatButtonModule, MatCardModule, MatBadgeModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
@Input() books!:InsideBook;
nomoreundo: boolean = true;
nomore:boolean = false;
undoAmount:number = 0;
if ( dostupnostmnozstvo = 0) {
  this.nomore = true;
  this.nomoreundo = true;
  
}
reserveBook(){
  
  if(this.books.dostupnostmnozstvo > 0){
    this.nomoreundo=false;
    this.books.dostupnostmnozstvo = this.books.dostupnostmnozstvo - 1;
    this.undoAmount = this.undoAmount + 1;
    console.log("undo" ,this.undoAmount);
      console.log("dostupnost" ,this.books.dostupnostmnozstvo);
      if(this.books.dostupnostmnozstvo == 0){
          console.log('no more books');
          this.nomore=true;
      }
  }else{
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
}