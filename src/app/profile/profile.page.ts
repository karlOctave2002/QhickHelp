import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userProfile: any = null;

  constructor(private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
    this.userProfile = await this.storage.get('userProfile');
  }

  async saveProfile(form: { value: { nombre: any; apellido: any; telefono: any; gmail: any; }; }) {
    const profileData = {
      nombre: form.value.nombre,
      apellido: form.value.apellido,
      telefono: form.value.telefono,
      gmail: form.value.gmail,
    };
    await this.storage.set('userProfile', profileData);
    this.userProfile = profileData;
  }

  editProfile() {
    this.userProfile = null; // Resetea el formulario para edición
  }
}
