import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LibraryComponent } from './library/library.component';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LibraryComponent,MatToolbar,MatIcon, MatIconModule,MatButtonModule,RouterOutlet, RouterLink, RouterLinkActive,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'ang-first';
}
  