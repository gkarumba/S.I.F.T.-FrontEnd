import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng5SliderModule } from 'ng5-slider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core'

import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { RetailersComponent } from './retailers/retailers.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

import { FiltersComponent } from './filters/filters.component';

import { GmapComponent } from './gmap/gmap.component';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


const firebaseConfig = {
 apiKey: 'AIzaSyAvYCgR9Kz3ACF91YfQL-vV-mN7JPYD2B4',
 authDomain: 'testing-5c7bc.firebaseapp.com',
 databaseURL: 'https://testing-5c7bc.firebaseio.com',
 projectId: 'testing-5c7bc',
 storageBucket: '',
 messagingSenderId: '650436830549',
 appId: '1:650436830549:web:6ec5277687954807'
};


@NgModule({
  declarations: [
    AppComponent,

    LandingPageComponent,
    LoginComponent,
    RegistrationComponent,
    RetailersComponent,


    NavbarComponent,
    



    HomeComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,

    FiltersComponent,

    GmapComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Ng5SliderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAJXMzzE17saSH55EZCT2m1YLsfaEWfNsY',
      libraries: ['places']
    }),

    FormsModule,

    ReactiveFormsModule,

    AppRoutingModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(firebaseConfig),
    HttpClientModule, 
    NgxSkeletonLoaderModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
