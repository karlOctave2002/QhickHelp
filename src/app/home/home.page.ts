import { Component, OnInit } from '@angular/core';
import { ApiClimaService } from '../servicios/api-clima.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  location: any;
  weather: any;
  errorMessage: string | null = null;

  constructor(private apiClimaService: ApiClimaService) {}

<<<<<<< HEAD
  

=======
>>>>>>> a369656037407e5bf87666e491f8948b0d786b15
  async ngOnInit() {
    try {
      const data = await this.apiClimaService.getLocationAndWeather();
      this.location = data.location;
      this.weather = data.weather;
    } catch (error) {
      console.error('Error obteniendo la ubicación o el clima:', error);
      this.errorMessage = 'No se pudo obtener la información. Verifique permisos y conexión a internet.';
    }
<<<<<<< HEAD

    this.apiClimaService.obtenerClima().subscribe({
      next: () =>{
        console.log('clima obternidos');

      },
    });
  }
  
=======
  }
>>>>>>> a369656037407e5bf87666e491f8948b0d786b15
}
