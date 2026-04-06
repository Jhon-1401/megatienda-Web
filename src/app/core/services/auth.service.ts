import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private STORAGE_KEY = 'users';
  private AUTH_KEY = 'authUser';

  constructor() {
    const users = JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');

    if (users.length === 0) {
      const admin = {
        fullName: 'Admin Principal',
        email: 'admin@admin.com',
        username: 'admin',
        password: '1234',
        role: 'admin',
      };

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([admin]));
    }
  }

  register(
    fullName: string,
    email: string,
    username: string,
    password: string
  ): boolean {

    const users = this.getUsers();

    const userExists = users.find(u => u.username === username);

    if (userExists) {
      return false;
    }

    const newUser = {
      fullName,
      email,
      username,
      password,
      role: 'user',
    };

    users.push(newUser);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));

    return true;
  }

  login(username: string, password: string): boolean {

    const users = this.getUsers();

    const user = users.find(
      u => u.username === username && u.password === password
    );

    if (!user) {
      return false;
    }

    localStorage.setItem(this.AUTH_KEY, JSON.stringify(user));
    localStorage.setItem('role', user.role.toUpperCase());

    return true;
  }

  logout(): void {
    localStorage.removeItem(this.AUTH_KEY);
    localStorage.removeItem('role');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.AUTH_KEY);
  }

  get userRole(): string {
    return localStorage.getItem('role') || '';
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem(this.AUTH_KEY)!);
  }

  private getUsers(): any[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }
}