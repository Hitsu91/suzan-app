import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    const logged = await this.authService.login(this.username, this.password);

    if (logged) {
      this.router.navigateByUrl('/');
      return;
    }
    alert('Credenziali errate');
  }
}
