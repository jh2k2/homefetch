import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'search', component: SearchComponent },
  { path: 'search/:param', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
