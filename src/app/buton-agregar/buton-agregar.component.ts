import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';


@Component({
  selector: 'app-buton-agregar',
  templateUrl: './buton-agregar.component.html',
  styleUrls: ['./buton-agregar.component.scss'],
})
export class ButonAgregarComponent  implements OnInit {

  constructor() { 
    addIcons({ add });
  }

  ngOnInit() {

  }

}
