import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {
<<<<<<< HEAD
  activeTab: string = 'home'; // Por defecto, el botón "home" está activo

  setActiveTab(tab: string): void {
    this.activeTab = tab; // Cambia el estado al botón seleccionado
  }
=======
>>>>>>> a369656037407e5bf87666e491f8948b0d786b15

  constructor() { }

  ngOnInit() {}

}
