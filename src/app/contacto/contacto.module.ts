import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactoPageRoutingModule } from './contacto-routing.module';

import { ContactoPage } from './contacto.page';
import { ButonAgregarComponent } from '../buton-agregar/buton-agregar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactoPageRoutingModule
  ],
  declarations: [ContactoPage, ButonAgregarComponent]
})
export class ContactoPageModule {}
