import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms';
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
    FormsModule
  ]
})
export class PagesModule { }
