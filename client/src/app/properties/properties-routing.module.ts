import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPropertyComponent } from './add-property/add-property.component';
import { ViewPropertyComponent } from './view-property/view-property.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { PaymentComponent } from './payment/payment.component';

import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  { path: 'add', component: AddPropertyComponent, canActivate: [AuthGuardService] },
  { path: 'view/:id', component: ViewPropertyComponent },
  { path: 'payment/:id', component: PaymentComponent, canActivate: [AuthGuardService] },
  { path: 'edit/:id', component: EditPropertyComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertiesRoutingModule { }
