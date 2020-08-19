import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesRoutingModule } from './properties-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AgmCoreModule } from '@agm/core';

import { ViewPropertyComponent } from './view-property/view-property.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { PropertyFormComponent } from './property-form/property-form.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';
import { PaymentComponent } from './payment/payment.component';

@NgModule({
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatGoogleMapsAutocompleteModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AgmCoreModule
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: [AddPropertyComponent, ViewPropertyComponent, PropertyFormComponent, EditPropertyComponent, PaymentComponent]
})
export class PropertiesModule { }
