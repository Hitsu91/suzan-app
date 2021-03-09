import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading = false;
  hide = true;
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    this.loading = true;
    const logged = await this.authService.login(this.username, this.password);
    if (logged) {
      this.authService.isAdmin.subscribe((isAdmin) => {
        this.loading = false;
        if (isAdmin) {
          this.router.navigateByUrl('/admin');
        } else {
          this.router.navigateByUrl('/user');
        }
      });
      return;
    }
    this.showWrongCredential();
  }

  showWrongCredential(): void {}
}
