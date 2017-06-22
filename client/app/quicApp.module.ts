import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MaterialModule,
          MdIconRegistry,
          MdMenuModule,
          MdDialogModule,
          MdIconModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';


// Modules
import { RoutingModule } from './routing.module';
import { QuicAppComponent } from './quicApp.component';
import { LoadingModule, LoadingService } from './modules/loading/loading.module';


// Services
import { Store } from './services/store/store';
import { API_URL } from './app.tokens';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { AuthGuardLogin } from './services/auth-guard-login.service';
import { AuthGuardAdmin } from './services/auth-guard-admin.service';
import { HttpService } from './services/http-service';


// Components
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { AppHeaderComponent } from './components/appHeader/appHeader.component';
import { UserProfileDialogComponent } from './components/userProfileDIalog/userProfileDialog.component';



@NgModule({
  declarations: [
    QuicAppComponent,
    HomeComponent,
    UserComponent,
    AppHeaderComponent,
    UserProfileDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RoutingModule,
    MaterialModule,
    FlexLayoutModule,
    MdDialogModule,
    MdIconModule,
    LoadingModule.forRoot()
  ],
  providers: [
    Store,
    AuthService,
    AuthGuardLogin,
    AuthGuardAdmin,
    UserService,
    MdIconRegistry,
    {provide: API_URL, useValue: '/api/'},
    {
      provide: HttpService,
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new HttpService(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    },
  ],
  entryComponents: [
    UserProfileDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [QuicAppComponent]
})

export class QuicAppModule { }
