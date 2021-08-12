import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  isLoggedIn = false;

  constructor(public fAuth: AngularFireAuth) {}

  async login(email: string, password: string) {
    await this.fAuth.signInWithEmailAndPassword(email, password).then((res) => {
      this.isLoggedIn = true;
      localStorage.setItem('user', JSON.stringify(res.user));
    });
  }

  logout() {
    this.fAuth.signOut();
    localStorage.removeItem('user');
  }
}
