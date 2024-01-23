import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), provideAnimations(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-2e92c","appId":"1:947597076511:web:defd20d81fd3851e410d2a","storageBucket":"ring-of-fire-2e92c.appspot.com","apiKey":"AIzaSyDXpFdRi9Ti0lCSHYh7kY21gfTs3RtW2KM","authDomain":"ring-of-fire-2e92c.firebaseapp.com","messagingSenderId":"947597076511"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
