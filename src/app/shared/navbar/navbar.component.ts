import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  get isAuthenticated(): Observable<Boolean> {
    return this.authService.isAuthenticated;
  }
  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
