import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

import { PagesModule } from './pages/pages.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { UserService } from './services/user.service'
import { ErrorComponent } from './pages/error/error.component'

import { ErrorService } from './services/error.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDLUqRbtCSwCnz3a9wTjhE22otxiTR-2LI',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    PagesModule,
    BrowserModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgbModule,
  ],
  providers: [UserService, ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
