import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { HomeComponent } from './Components/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { ElectioncampaignsComponent } from './Components/electioncampaigns/electioncampaigns.component';
import { WebsitedesignComponent } from './Components/websitedesign/websitedesign.component';
import { WhousComponent } from './Components/whous/whous.component';
import { MobileappComponent } from './Components/mobileapp/mobileapp.component';
import { AdvertisngComponent } from './Components/advertisng/advertisng.component';
import { ContactusComponent } from './Components/contactus/contactus.component';
import { AdminModule } from './admin/admin.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
// import { environment } from 'src/environments/environment';

// Firebase instalation
import {AngularFireModule, FIREBASE_OPTIONS} from '@angular/fire/compat'// write this special code for upload img 
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    ElectioncampaignsComponent,
    WebsitedesignComponent,
    WhousComponent,
    MobileappComponent,
    AdvertisngComponent,
    ContactusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule,
    AngularFireStorageModule ,
    provideFirebaseApp(() => initializeApp(environment.firebase)), provideDatabase(() => getDatabase()), provideStorage(() => getStorage()),
  ],
  providers: [
   // write this special code for upload img 
   { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
    {provide : LocationStrategy,useClass:HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
