import { Component, OnInit } from '@angular/core';
import { ApiClimaService } from '../servicios/api-clima.service';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';
import { ContactService } from '../servicios/contact.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  location: any;
  weather: any;
  errorMessage: string | null = null;
  userProfile: any = null;

  constructor(
    private apiClimaService: ApiClimaService,
    private sms: SMS,
    private contactService: ContactService, 
    private storage: Storage
  ) {}


  async ngOnInit() {
    try {
      const data = await this.apiClimaService.getLocationAndWeather();
      this.location = data.location;
      this.weather = data.weather;
      this.userProfile = await this.storage.get('userProfile');
    } catch (error) {
      console.error('Error obteniendo la ubicación o el clima:', error);
      this.errorMessage = 'No se pudo obtener la información. Verifique permisos y conexión a internet.';
    }

    // Obtener el clima
    this.apiClimaService.obtenerClima().subscribe({
      next: (data) => {
        console.log('Clima obtenido:', data);
      },
      error: (err) => {
        console.error('Error al obtener el clima:', err);
        this.errorMessage = 'Hubo un problema al obtener el clima.';
      }
    });
  }

    async enviarSms() {
      try {
        const contacts = await this.contactService.getSavedContacts();
        if (contacts.length === 0) {
          console.error('No hay contactos guardados.');
          return;
        }
  
        if (!this.userProfile) {
          console.error('No se encontraron datos del perfil.');
          return;
        }
  
        const phoneNumbers = contacts.map(contact => contact.phone);
        const address = `${this.location.address.road} ${this.location.address.house_number}, ${this.location.address.city || this.location.address.neighborhood}`;
        const message = `Hola, soy ${this.userProfile.nombre} ${this.userProfile.apellido}. Me encuentro en emergencia. Por favor, intenta contactarme de urgencia. Estoy ubicado en: ${address}.`;
  
        // Enviar el mensaje
        const result = await this.sms.send(phoneNumbers.join(','), message);
        console.log('SMS enviado con éxito:', result);
      } catch (error) {
        console.error('Error al enviar SMS:', error);
      }
    }
  }
  