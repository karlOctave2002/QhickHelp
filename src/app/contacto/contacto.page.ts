import { Component, OnInit } from '@angular/core';
import { Contacts } from '@capacitor-community/contacts';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {
  contacts: any[] = [];

  constructor() {}

  ngOnInit() {
    console.log('Componente inicializado.');
    this.getContacts();
  }

  async getContacts() {
    try {
      console.log('Solicitando permisos...');
      const permission = await Contacts.requestPermissions();
      console.log('Permisos: ', permission.contacts);

      if (permission?.contacts !== 'granted') {
        console.log('Permisos no otorgados.');
        return;
      }

      console.log('Obteniendo contactos...');
      const result = await Contacts.getContacts({
        projection: {
          name: true,
          phones: true,
        },
      });

      console.log('result: ', JSON.stringify(result));

      if (result && result.contacts) {
        this.contacts = result.contacts;
        console.log('Contactos recuperados:', this.contacts);
      } else {
        console.log('No se encontraron contactos o el resultado es inválido.');
      }
    } catch (e) {
      console.error('Error al obtener los contactos:', e);
    }
  }
}
