import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactoPage } from './contacto.page';
import { ContactService } from '../servicios/contact.service';
import { Storage } from '@ionic/storage-angular';
import { mockContact } from '../home/mocks/storage';




describe('ContactoPage', () => {
  let component: ContactoPage;
  let fixture: ComponentFixture<ContactoPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactoPage], // Declara la página bajo prueba
      providers: [
        ContactService, // Proveedor del servicio de contactos
        { provide: Storage, useValue: mockContact }, // Proveedor del mock de Storage
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
