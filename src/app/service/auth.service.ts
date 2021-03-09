import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token?: string | null;
  loading = true;
  authenticatedUser: Subject<User | null> = new ReplaySubject();

  isAuthenticated: Observable<boolean> = this.authenticatedUser.pipe(
    map((user) => user != null)
  );

  isAdmin: Observable<boolean> = this.authenticatedUser.pipe(
    map((user) => user?.role == 'ADMIN' ?? false)
  );

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }

  initUser() {
    if (this.token) {
      this.loading = true;
      this.getAuthenticatedUser()
        .toPromise()
        .then((user) => {
          this.authenticatedUser.next(user);
          this.loading = false;
        })
        .catch(/* It's fine the user cannot login */);
    }
  }

  getAuthenticatedUser(): Observable<User> {
    return this.http.get<User>('http://localhost:8080/auth/who-am-i');
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const res = await this.http
        .post<JWT>('http://localhost:8080/login', {
          username,
          password,
        })
        .toPromise();

      this.token = res.jwt;
      localStorage.setItem('token', this.token);
      this.initUser();
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.authenticatedUser.next(null);
    this.token = null;
  }
}
export interface User {
  username: String;
  role: String;
}

export interface JWT {
  jwt: string;
}
