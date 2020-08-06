import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertiesRoutingModule } from './properties-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { MatCardModule } from '@angular/material/card';

import { ViewPropertyComponent } from './view-property/view-property.component';
import { AddPropertyComponent } from './add-property/add-property.component';
import { PropertyFormComponent } from './property-form/property-form.component';
import { EditPropertyComponent } from './edit-property/edit-property.component';

@NgModule({
  imports: [
    CommonModule,
    PropertiesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatGoogleMapsAutocompleteModule,
    MatCardModule
  ],
  declarations: [AddPropertyComponent, ViewPropertyComponent, PropertyFormComponent, EditPropertyComponent]
})
export class PropertiesModule { }
