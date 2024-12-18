import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiClimaService } from '../servicios/api-clima.service';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    HttpClientModule
  ],
  declarations: [HomePage],
  providers: [ApiClimaService, SMS, CallNumber, AndroidPermissions]
})
export class HomePageModule {}
