import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';
<<<<<<< HEAD
import { ApiClimaService } from '../servicios/api-clima.service';
import { ApiServiceMock } from './interfaces/climaService.mocks';
=======
>>>>>>> a369656037407e5bf87666e491f8948b0d786b15

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
<<<<<<< HEAD
      imports: [IonicModule.forRoot()],
      providers: [[{ provide: ApiClimaService, useValue: ApiServiceMock }]]
=======
      imports: [IonicModule.forRoot()]
>>>>>>> a369656037407e5bf87666e491f8948b0d786b15
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
