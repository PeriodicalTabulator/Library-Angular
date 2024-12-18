import { Component, output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { Event } from '@angular/router';
import { LibraryComponent } from './library/library.component';
import { NgFor } from '@angular/common';
import { Output } from '@angular/core';
import { TheLibraryService } from './the-library.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PopUpComponent } from './pop-up/pop-up.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatToolbar,MatButtonModule,RouterOutlet, RouterLink, RouterLinkActive,RouterModule,HttpClientModule,NgFor,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  receivedData: any = null;

  items: string[] = [];

  constructor(private itemService: TheLibraryService, private bottomSheet: MatBottomSheet) {}

  ngOnInit() {
    this.itemService.newItem$.subscribe((newItem: string) => {
      this.items.push(newItem);
      console.log('Parent updated items:', this.items);
    });
}

popUpOpen(){
  this.bottomSheet.open(PopUpComponent);
}
}