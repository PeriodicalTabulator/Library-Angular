import { Routes } from '@angular/router';
import { BookComponent } from './book/book.component';
import { CartComponent } from '../cart/cart.component';
import { NgModule } from '@angular/core';
import { LibraryComponent } from './library/library.component';

 export const routes: Routes = [
    {path: '', component: LibraryComponent},
    {path: 'cart', component: CartComponent},
];
