import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  role: Observable<String>;
  constructor(private authService: AuthService) {
    this.role = this.authService.authenticatedUser.pipe(
      map((user) => user?.role ?? 'role')
    );
  }
}
