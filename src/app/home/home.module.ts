import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
<<<<<<< HEAD
import { HttpClientModule } from '@angular/common/http';
import { ApiClimaService } from '../servicios/api-clima.service';
=======
>>>>>>> a369656037407e5bf87666e491f8948b0d786b15


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
<<<<<<< HEAD
    HomePageRoutingModule,
    HttpClientModule
  ],
  declarations: [HomePage],
  providers:[ApiClimaService]
=======
    HomePageRoutingModule
  ],
  declarations: [HomePage]
>>>>>>> a369656037407e5bf87666e491f8948b0d786b15
})
export class HomePageModule {}
