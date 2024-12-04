import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent  implements OnInit {
  activeTab: string = 'home'; // Por defecto, el botón "home" está activo

  setActiveTab(tab: string): void {
    this.activeTab = tab; // Cambia el estado al botón seleccionado
  }

  constructor() { }

  ngOnInit() {}

}
