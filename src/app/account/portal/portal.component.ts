import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  user: User;
  menuShown = false;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.user = this.userService.info();
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }

  toggle() {
    this.menuShown = !this.menuShown;
    const menu = document.getElementById('menu') as HTMLElement;
    if (this.menuShown) {
      menu.style.display = 'flex';
    } else {
      menu.style.display = 'none';
    }
  }

}
