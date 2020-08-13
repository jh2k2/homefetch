import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { MatSelectModule } from '@angular/material/select'
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AgmCoreModule } from '@agm/core';

import { HomepageComponent } from './homepage/homepage.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    HomepageComponent, NotFoundComponent, SearchComponent, SearchbarComponent, AboutComponent,
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDLUqRbtCSwCnz3a9wTjhE22otxiTR-2LI',
      libraries: ['places']
    }),
    CommonModule,
    PagesRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    MatGoogleMapsAutocompleteModule,
    MatSelectModule,
    MatAutocompleteModule
  ]
})
export class PagesModule { }
