import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { NotFoundComponent } from './not-found/not-found.component';

import { ShowMoreComponent } from './show-more/show-more.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialsModule } from './materials.module';

import { LandingPageComponent } from './landing-page/landing-page.component';

import { SignupComponent } from './signup/signup.component';

import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NewFeedsComponent } from './new-feeds/new-feeds.component';

import { ViewProfileComponent } from './view-profile/view-profile.component';

import { HttpClientModule } from '@angular/common/http';

import { ChatPageComponent } from './chat-page/chat-page.component';

import { ChatListComponent } from './chat-list/chat-list.component';

@NgModule({
  declarations: [
    AppComponent,
    
    NotFoundComponent,
    
    ShowMoreComponent,
    
    LandingPageComponent,
    
    SignupComponent,
    
    LoginComponent,
    
    NewFeedsComponent,
    
    ViewProfileComponent,
    
    ChatPageComponent,

    ChatListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
