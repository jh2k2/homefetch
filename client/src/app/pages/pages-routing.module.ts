import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchComponent } from './search/search.component';
import { HIWComponent } from './hiw/hiw.component';
import { FAQComponent } from './faq/faq.component';
import { MissionComponent } from './mission/mission.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search/:param', component: SearchComponent },
  { path: 'mission', component: MissionComponent},
  { path: 'faq', component: FAQComponent},
  { path: 'hiw', component: HIWComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
