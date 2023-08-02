import { Injectable } from '@angular/core';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: SocialUser | null = null;

  setUser(user: SocialUser | null) {
    this.user = user;
  }

  getUser(): SocialUser | null {
    return this.user;
  }
}
