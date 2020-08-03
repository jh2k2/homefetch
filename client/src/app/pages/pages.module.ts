import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomepageComponent, NotFoundComponent, SearchComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule
  ]
})
export class PagesModule { }
