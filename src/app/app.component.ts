import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { Event } from '@angular/router';
import { LibraryComponent } from './library/library.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatToolbar,MatButtonModule,RouterOutlet, RouterLink, RouterLinkActive,RouterModule,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  receivedData: any = null;

  onComponentActivate(component: any) {
    if (component instanceof LibraryComponent) {
      component.dataEvent.subscribe((data: any) => {
        this.receivedData = data;
      });
    }
  }

  handleLibraryData(data: any) {
    console.log('Received data:', data);
  }
}

  