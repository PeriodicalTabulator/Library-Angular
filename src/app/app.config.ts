import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { importProvidersFrom } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';


const firebaseConfig = {
  apiKey: "AIzaSyDoXXX2_n7U1wYShQGfFdVMzLH1l9_28GM",
  authDomain: "library-project-91d70.firebaseapp.com",
  projectId: "library-project-91d70",
  storageBucket: "library-project-91d70.firebasestorage.app",
  messagingSenderId: "825022692940",
  appId: "1:825022692940:web:e4136afaba70f51e927ee9",
  measurementId: "G-TFM9J4PNZR"
};

export const appConfig: ApplicationConfig = {
  
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideHttpClient(),
    importProvidersFrom(
      AngularFirestoreModule,
      AngularFireModule.initializeApp(firebaseConfig)
    )
  ]
  
};

