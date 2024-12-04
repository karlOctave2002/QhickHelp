import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  menuOptions: any;

  constructor() { }

  ngOnInit() {
    this.menuOptions = [
      {
        "url": "/home",
        "iconName": "home",
        "optionName": "Inicio"

      },
      {
        "url": "/contacto",
        "iconName": "people",
        "optionName": "Contacto"

      },

      {
        "url": "/ubicacion",
        "iconName": "location-outline",
        "optionName": "Ubicación"

      },
    ]
  }

}
