import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ContactService } from '../servicios/contact.service';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
})
export class ContactoPage implements OnInit {
  deviceContacts: { name: string; phone: string; selected?: boolean }[] = [];
  savedContacts: { name: string; phone: string }[] = [];
  favoriteContact: { name: string; phone: string } | null = null;

  constructor(
    private contactService: ContactService,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    await this.loadSavedContacts();
    await this.loadFavoriteContact();
  }

  async ionViewWillEnter() {
    // Asegura que los contactos guardados se carguen cada vez que la página se vea
    await this.loadSavedContacts();
    await this.loadFavoriteContact();
  }

  async loadSavedContacts() {
    this.savedContacts = await this.contactService.getSavedContacts();
  }

  async loadFavoriteContact() {
    this.favoriteContact = await this.contactService.getFavoriteContact();
  }

  async loadDeviceContacts() {
    try {
      const deviceContacts: any[] = await this.contactService.getContactsFromDevice();
      this.deviceContacts = deviceContacts.map(contact => ({
        name: contact.name.display,
        phone: contact.phones.length > 0 ? contact.phones[0].number : '',
        selected: false,
      }));
      this.showDeviceContacts();
    } catch (error) {
      console.error('Error al cargar contactos:', error);
    }
  }

  async showDeviceContacts() {
    const alert = await this.alertCtrl.create({
      header: 'Seleccionar contactos',
      inputs: this.deviceContacts.map((contact) => ({
        type: 'checkbox',
        label: contact.name,
        value: contact,
      })),
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Guardar',
          handler: async (selectedContacts) => {
            if (selectedContacts.length > 5) {
              const maxAlert = await this.alertCtrl.create({
                header: 'Advertencia',
                message: 'Solo puedes seleccionar un máximo de 5 contactos.',
                buttons: ['OK'],
              });
              await maxAlert.present();
              return;
            }
            await this.contactService.saveSelectedContacts(selectedContacts);
            await this.loadSavedContacts();
          },
        },
      ],
    });

    await alert.present();
  }

  async confirmDelete(contact: { name: string; phone: string }) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar contacto',
      message: `¿Seguro que deseas eliminar a ${contact.name}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.contactService.deleteContact(contact);
            await this.loadSavedContacts();
            if (this.favoriteContact && this.favoriteContact.phone === contact.phone) {
              await this.contactService.saveFavoriteContact(null);
              this.favoriteContact = null;
            }
          },
        },
      ],
    });

    await alert.present();
  }

  async selectFavorite(contact: { name: string; phone: string }) {
    await this.contactService.saveFavoriteContact(contact);
    this.favoriteContact = contact;
  }
}
