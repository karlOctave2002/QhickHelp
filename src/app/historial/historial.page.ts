import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  historial: any[] = [];

  constructor(private storage: Storage) {}

  async ngOnInit() {
    await this.storage.create();
    this.historial = await this.storage.get('historial') || [];
    this.historial.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()); // Ordenar por fecha descendente
  }
}
