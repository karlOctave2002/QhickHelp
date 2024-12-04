import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Geolocation } from '@capacitor/geolocation';
import { ToastController } from '@ionic/angular';
<<<<<<< HEAD
import { Clima } from '../home/interfaces/clima.interfaces';
=======
>>>>>>> a369656037407e5bf87666e491f8948b0d786b15

@Injectable({
  providedIn: 'root'
})
export class ApiClimaService {
  private apiKey = 'b4d67ef135013461006cb1613ff59253'; 
<<<<<<< HEAD
  url: string =  `https://api.openweathermap.org/data/2.5/weather?lat=50&lon=50&appid=b4d67ef135013461006cb1613ff59253&units=metric`

  constructor(private http: HttpClient, 
    private toastController: ToastController) {}
=======

  constructor(private http: HttpClient, private toastController: ToastController) {}
>>>>>>> a369656037407e5bf87666e491f8948b0d786b15

  async getLocationAndWeather() {
    try {
      // Verificar permisos antes de obtener la ubicación
      const permissionStatus = await Geolocation.checkPermissions();
      if (permissionStatus.location !== 'granted') {
        await Geolocation.requestPermissions();
      }

      // Obtener la ubicación actual del usuario
      const position = await Geolocation.getCurrentPosition();
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      // Obtener los datos del clima
      const weatherData = await this.getWeather(lat, lon);
      // Obtener la ciudad y calle a partir de la latitud y longitud
      const locationData = await this.reverseGeocode(lat, lon);

      return { location: locationData, weather: weatherData };
    } catch (error) {
      // Mostrar mensaje de error si falla
      const toast = await this.toastController.create({
        message: 'No se pudo obtener la ubicación o el clima. Asegúrate de que los permisos estén habilitados y tienes conexión a internet.',
        duration: 3000
      });
      await toast.present();
      throw error;
    }
  }

  private async getWeather(lat: number, lon: number) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    try {
      return await this.http.get(url).toPromise();
    } catch (error) {
      console.error('Error al obtener el clima:', error);
      throw error;
    }
  }

  private async reverseGeocode(lat: number, lon: number) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
    try {
      return await this.http.get(url).toPromise();
    } catch (error) {
      console.error('Error en la geocodificación inversa:', error);
      throw error;
    }
  }
<<<<<<< HEAD

  obtenerClima(){
    return this.http.get<Clima>(this.url);
  }
}

=======
}
>>>>>>> a369656037407e5bf87666e491f8948b0d786b15
