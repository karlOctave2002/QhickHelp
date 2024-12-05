import { TestBed } from '@angular/core/testing';
import { ApiClimaService } from './api-clima.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { mockClima } from '../home/mocks/wheater.mocks'; // Asegúrate de que el mock sea correcto
import { of } from 'rxjs';
import { Geolocation } from '@capacitor/geolocation'; // Asegúrate de importar Geolocation si es necesario

describe('ApiClimaService', () => {
  let service: ApiClimaService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        ApiClimaService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Geolocation, useValue: {} }, // Mock de Geolocation si es necesario
      ]
    });

    service = TestBed.inject(ApiClimaService); // Inyección del servicio usando TestBed
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('debería obtener la temperatura actual', (done: DoneFn) => {
    // Mock de la respuesta de la API
    httpClientSpy.get.and.returnValue(of(mockClima));

    service.obtenerClima().subscribe({
      next: (response) => {
        expect(response).toEqual(mockClima); // Verifica que la respuesta sea igual a mockClima
        expect(httpClientSpy.get.calls.count()).toBe(1); // Verifica que se haya llamado a la API una vez
        const expectedUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=50&lon=50&appid=b4d67ef135013461006cb1613ff59253&units=metric';
        expect(httpClientSpy.get.calls.first().args[0]).toBe(expectedUrl); // Verifica que la URL sea correcta
        done();
      },
      error: done.fail
    });
  });
});
