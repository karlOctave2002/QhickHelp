import { Injectable } from '@angular/core';
import { Contacts } from '@capacitor-community/contacts';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    this._storage = await this.storage.create();
  }

  async getContactsFromDevice() {
    const permission = await Contacts.requestPermissions();

    if (permission?.contacts === 'granted') {
      const { contacts } = await Contacts.getContacts({
        projection: { 
          name: true, 
          phones: true 
        } 
      });
      return contacts || [];
    } else {
      throw new Error('Permiso denegado para acceder a los contactos.');
    }
  }

  // Guardar contactos seleccionados sin duplicados
  async saveSelectedContacts(selectedContacts: { name: string; phone: string }[]) {
    const currentContacts = await this.getSavedContacts();
    const contactsToSave = selectedContacts.filter(contact =>
      !currentContacts.some(c => c.phone === contact.phone)
    );
    const updatedContacts = [...currentContacts, ...contactsToSave];
    await this._storage?.set('saved_contacts', updatedContacts);
  }

  // Obtener contactos guardados
  async getSavedContacts(): Promise<{ name: string; phone: string }[]> {
    return (await this._storage?.get('saved_contacts')) || [];
  }

  // Eliminar contacto guardado
  async deleteContact(contact: { name: string; phone: string }) {
    const currentContacts = await this.getSavedContacts();
    const updatedContacts = currentContacts.filter(c => c.phone !== contact.phone);
    await this._storage?.set('saved_contacts', updatedContacts);
  }

  // Guardar contacto favorito
  async saveFavoriteContact(contact: { name: string; phone: string } | null) {
    await this._storage?.set('favorite_contact', contact);
  }

  // Obtener contacto favorito
  async getFavoriteContact(): Promise<{ name: string; phone: string } | null> {
    return await this._storage?.get('favorite_contact');
  }
}
