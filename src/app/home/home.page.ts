import { Component, OnInit } from '@angular/core';
import { ApiClimaService } from '../servicios/api-clima.service';
import { SMS } from '@awesome-cordova-plugins/sms/ngx';
import { ContactService } from '../servicios/contact.service';
import { Storage } from '@ionic/storage-angular';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';

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
  favoriteContact: { name: string; phone: string } | null = null;

  constructor(
    private apiClimaService: ApiClimaService,
    private sms: SMS,
    private contactService: ContactService, 
    private storage: Storage,
    private callNumber: CallNumber
  ) {}

  async ngOnInit() {
    try {
      const data = await this.apiClimaService.getLocationAndWeather();
      this.location = data.location;
      console.log('Ubicación obtenida:', this.location); // Verificación
      this.weather = data.weather;
      this.userProfile = await this.storage.get('userProfile');
      this.favoriteContact = await this.contactService.getFavoriteContact();
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
    const fecha = new Date().toLocaleString();

    try {
      const contacts = await this.contactService.getSavedContacts();

      const phoneNumbers = contacts.map(contact => contact.phone);
      const address = `${this.location.address.road} ${this.location.address.house_number}, ${this.location.address.city || this.location.address.neighborhood}`;

      const message = `Urgente!!!  Me encuentro en emergencia. Por favor, intenta contactarme de urgencia. Estoy ubicado en: ${address}.`;

      const result = await this.sms.send(phoneNumbers.join(','), message);
      console.log('SMS enviado con éxito:', result);
      await this.guardarHistorial(fecha, 'EXITOSO', address);

      // Hacer la llamada al contacto favorito
      if (this.favoriteContact) {
        await this.callNumber.callNumber(this.favoriteContact.phone, true);
        console.log('Llamada realizada al contacto favorito:', this.favoriteContact.phone);
      }
    } catch (error) {
      console.error('Error al enviar SMS o realizar llamada:', error);
      await this.guardarHistorial(fecha, 'FALLADO', 'Desconocida');
    }
  }

  async guardarHistorial(fecha: string, estado: string, address?: string) {
    const historial = await this.storage.get('historial') || [];
    historial.push({ fecha, estado, ubicacion: address });
    await this.storage.set('historial', historial);
  }
}
