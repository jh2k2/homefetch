import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { HomepageComponent } from './homepage/homepage.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';
import { HIWComponent } from './hiw/hiw.component';
import { FAQComponent } from './faq/faq.component';
import { MissionComponent } from './mission/mission.component';



@NgModule({
  declarations: [
    HomepageComponent, NotFoundComponent, SearchComponent, HIWComponent, FAQComponent, MissionComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class PagesModule { }
