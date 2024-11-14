import { Routes } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { LibraryComponent } from './library/library.component';

 export const routes: Routes = [
    {path: '', component: LibraryComponent},
    {path: 'cart', component: CartComponent},
];
