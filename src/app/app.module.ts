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

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ChatPageComponent } from './chat-page/chat-page.component';

import { ChatListComponent } from './chat-list/chat-list.component';

import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';

import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';

import { GoogleComponent } from './google/google.component';

import { AddFriendsComponent } from './add-friends/add-friends.component';

import { AllUsersPipe } from './pipes/all-users.pipe';

import { NotificationsComponent } from './notifications/notifications.component';

import { InterceptorService } from './services/Interceptor/interceptor.service';

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

    ChatListComponent,
    
    GoogleComponent,

    AddFriendsComponent,

    AllUsersPipe,

    NotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMatIntlTelInputModule,
    SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '627203997143-6uv7n3vcuuqnmrois05u1q119ir5cs5c.apps.googleusercontent.com'
            )
          }
        ]
      }
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
