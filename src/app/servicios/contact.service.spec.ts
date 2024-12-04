import { TestBed } from '@angular/core/testing';
<<<<<<< HEAD
import { ContactService } from './contact.service';
import { Storage } from '@ionic/storage-angular'; // Importa el Storage de Ionic

// Creamos el mockStorage con los métodos necesarios
const mockStorage = jasmine.createSpyObj('Storage', ['set', 'get', 'remove', 'create']);

// Definimos los valores predeterminados para los métodos del mock
mockStorage.set.and.returnValue(Promise.resolve());
mockStorage.get.and.returnValue(Promise.resolve([]));
mockStorage.create.and.returnValue(Promise.resolve(mockStorage));
=======

import { ContactService } from './contact.service';
>>>>>>> a369656037407e5bf87666e491f8948b0d786b15

describe('ContactService', () => {
  let service: ContactService;

  beforeEach(() => {
<<<<<<< HEAD
    TestBed.configureTestingModule({
      providers: [
        ContactService, // Proveemos el servicio ContactService
        { provide: Storage, useValue: mockStorage } // Usamos el mockStorage para Storage
      ]
    });
    
    // Inyectamos el servicio
=======
    TestBed.configureTestingModule({});
>>>>>>> a369656037407e5bf87666e491f8948b0d786b15
    service = TestBed.inject(ContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
<<<<<<< HEAD

  it('debería guardar los contactos seleccionados', async () => {
    const selectedContacts = [{ name: 'Jane Doe', phone: '987654' }];
    
    // Llamamos al método que guarda los contactos
    await service.saveSelectedContacts(selectedContacts);
  
    // Verificamos que el método `set` de mockStorage fue llamado con la clave 'saved_contacts' y los contactos seleccionados
    expect(mockStorage.set).toHaveBeenCalledWith('saved_contacts', selectedContacts);
  });

  it('debería obtener los contactos guardados', async () => {
    const contacts = await service.getSavedContacts();
    expect(contacts).toEqual([]); // Se espera que el método `getSavedContacts` retorne un array vacío
  });
=======
>>>>>>> a369656037407e5bf87666e491f8948b0d786b15
});
