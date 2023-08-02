import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component } from '@angular/core';
import { UserService } from './Service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Crypto-Tracker';
  user:any;
  loggedIn:any;
  constructor(private authService: SocialAuthService,
    private userService: UserService) { }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);



      this.authService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
        console.log(this.user);

        // Set the user data in the UserService.
        this.userService.setUser(user);
      });
    });
  }
}
