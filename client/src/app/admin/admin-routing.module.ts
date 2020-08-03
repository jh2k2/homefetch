import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './panel/panel.component';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  { path: 'panel', component:PanelComponent , canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
